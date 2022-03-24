
import { LitElement, html, css } from 'lit';

import WebGLRenderer from './webgl-renderer';
import WebGLRenderer3d from './webgl-renderer-3d';

import { TriangulatedData } from '../../pkg/index'

class MapBackendWebGl extends LitElement {

    static get properties() {
        return {
            locations: { attribute: true },
        }
    }

    static get styles() {
        return css`
            :host {
                width: 100%;
                height: 100%;
                position: relative;
                display: block;
            }
            #map {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                display: block;
                position: absolute;
            }
        `;
    }

    newRenderer() {
        return new WebGLRenderer();
    }

    constructor() {
        super();
        this.renderer = this.newRenderer();
        this.state = {
            center: [0, 0],
            scale: 1,
            min: [0, 0],
            max: [0, 0],
            size: [0, 0],
            hover: null,
        };
    }

    get center() {
        return this.state.center;
    }

    get scale() {
        return this.state.scale;
    }

    setCenterAndScale(center, scale) {
        this.state.center = center;
        this.state.scale = scale;
    }
    
    clientPosToMapPos(client_pos) {
        const map = this.shadowRoot.getElementById('map');
        const map_pos = map.getBoundingClientRect();
        return this.renderer.clientPosToMapPos(client_pos, map_pos, this.state);
    }

    clientPosToProjPos(client_pos) {
        const map = this.shadowRoot.getElementById('map');
        const map_pos = map.getBoundingClientRect();
        return this.renderer.clientPosToProjPos(client_pos, map_pos, this.state);
    }
    
    projPosToClientPos(location_pos) {
        const map = this.shadowRoot.getElementById('map');
        const map_pos = map.getBoundingClientRect();
        return this.renderer.projPosToClientPos(location_pos, map_pos, this.state);
    }

    handleMouseMove(event) {
        // const pos = this.clientPosToProjPos([event.clientX, event.clientY]);
        // for(const loc of this.locations) {
        //     const triangles = this.location_data[loc.id];
        //     if(triangles.min[0] <= pos[0] && triangles.min[1] <= pos[1] &&
        //         triangles.max[0] >= pos[0] && triangles.max[1] >= pos[1]) {
        //         for(const polygon of triangles.polygons) {
        //             if(polygon.min[0] <= pos[0] && polygon.min[1] <= pos[1] &&
        //                 polygon.max[0] >= pos[0] && polygon.max[1] >= pos[1]) {
        //                 for(let i = 0; i < polygon.triangles.length; i += 3) {
        //                     const v1 = [
        //                         polygon.vertices[2 * polygon.triangles[i]],
        //                         polygon.vertices[2 * polygon.triangles[i] + 1]
        //                     ];
        //                     const v2 = [
        //                         polygon.vertices[2 * polygon.triangles[i + 1]],
        //                         polygon.vertices[2 * polygon.triangles[i + 1] + 1]
        //                     ];
        //                     const v3 = [
        //                         polygon.vertices[2 * polygon.triangles[i + 2]],
        //                         polygon.vertices[2 * polygon.triangles[i + 2] + 1]
        //                     ];
        //                     function sign(p1, p2, p3) {
        //                         return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
        //                     }
        //                     const d1 = sign(pos, v1, v2);
        //                     const d2 = sign(pos, v2, v3);
        //                     const d3 = sign(pos, v3, v1);
        //                     const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        //                     const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        //                     if(!(has_neg && has_pos)) {
        //                         this.state.hover = loc.id;
        //                         const my_event = new Event('hover');
        //                         my_event.location = loc;
        //                         my_event.position = this.projPosToClientPos([
        //                             (polygon.min[0] + polygon.max[0]) / 2,
        //                             (polygon.min[1] + polygon.max[1]) / 2
        //                         ]);
        //                         this.dispatchEvent(my_event);
        //                         return;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // this.handleMouseOut();
    }

    handleMouseOut() {
        this.state.hover = null;
        const my_event = new Event('hover');
        my_event.location = null;
        my_event.position = null;
        this.dispatchEvent(my_event);
    }
    
    handleTouchStart(event) {
        if(event.touches.length === 1) {
            this.handleMouseMove({
                clientX: event.touches[0].clientX,
                clientY: event.touches[0].clientY,
            });
        } else {
            this.handleMouseOut(event);
        }
    }
    
    renderMapInCanvas() {
        if (
            !this.last || this.last.center != this.state.center
            || this.last.scale != this.state.scale
            || this.last.hover != this.state.hover
            || this.last.size != this.state.size
        ) {
            this.renderer.renderMapInContext(this.locations, this.triangulated, this.state)
            this.last = { ...this.state };
        }
        window.requestAnimationFrame(this.renderMapInCanvas.bind(this));
    }

    updated() {
        const canvas = this.shadowRoot.getElementById('map');
        if (this.last_canvas != canvas) {
            this.last_canvas = canvas;
            this.renderer.deinitResources(this.locations, this.triangulated);
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            const handleResize = () => {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
                this.state.size = [canvas.width, canvas.height];
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            this.renderer.initForContext(canvas, gl, this.locations, this.triangulated);
            this.renderMapInCanvas();
        }
        this.last = null;
    }

    buildRenderData() {
        if (!this.triangulated) {
            this.triangulated = TriangulatedData.new();
            for (const loc of this.locations) {
                this.triangulated.add_location(loc.raw);
            }
            this.triangulated.triangulate(true);
            this.triangulated.generate_outlines(true);
            this.state.min = this.triangulated.min;
            this.state.max = this.triangulated.max;
        }
    }

    render() {
        this.buildRenderData();
        return html`
            <canvas
                id="map"
                @mousemove="${this.handleMouseMove}"
                @wheel="${this.handleMouseMove}"
                @mouseout="${this.handleMouseOut}"
                @touchstart="${this.handleTouchStart}"
                @touchmove="${this.handleTouchStart}"
            >
            </canvas>
        `;
    }
}

customElements.define('map-backend', MapBackendWebGl);

class MapBackendWebGl3d extends MapBackendWebGl {
    newRenderer() {
        return new WebGLRenderer3d();
    }
}

customElements.define('map-backend-3d', MapBackendWebGl3d);

