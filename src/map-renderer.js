
import { LitElement, html, svg, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { until } from 'lit-html/directives/until';

import './ui/spinner';

const data_location = './static/data/';
const location_cache = {};

class MapRenderer extends LitElement {

    static get properties() {
        return {
            data: { type: Object },
        };
    }
    
    static get styles() {
        return css`
            * {
                box-sizing: border-box;
            }
            :host {
                width: 100%;
                height: 100%;
                display: block;
            }
            div#map-renderer-root {
                width: 100%;
                height: 100%;
                overflow: visible;
                position: relative;
                color: white;
                padding: 1rem;
                --background: var(--background-dark);
                background: var(--background);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            svg.wrapping-svg {
                stroke: var(--background);
                stroke-width: 0.25%;
                stroke-linejoin: round;
                stroke-linecap: round;
                filter: url(#dropshadow);
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                display: block;
            }
            svg.wrapping-svg g:hover {
                fill-opacity: 0.75;
            }
            div#map-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                display: block;
            }
            div#info-box-wrapper {
                --anchor-point: 50%;
                --anchor-at-bottom: 0;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
                transform: translate(
                    calc(var(--anchor-point) * -1),
                    calc(var(--anchor-at-bottom) * (-100% - 8.5px) + (1 - var(--anchor-at-bottom)) * 8.5px));
                display: none;
                pointer-events: none;
            }
            div#info-box-wrapper.visible {
                display: block;
            }
            div#info-box {
                padding: 0.5rem;
                font-size: 0.9rem;
                font-family: Roboto, sans-serif;
                color: black;
                display: block;
                width: max-content;
                height: max-content;
                max-width: 15rem;
                min-width: 150px;
                width: 100%;
            }
            div#info-box-name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            div#info-box-background {
                display: block;
                position: absolute;
                background: var(--background-light);
                width: 100%;
                height: 100%;
                border-radius: 4px;
                opacity: 0.85;
                z-index: -1;
            }
            div#info-box-background::before {
                content: '';
                box-shadow: var(--shadow-small);
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                border-radius: 4px;
            }
            div#info-box-background::after {
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                top: calc(var(--anchor-at-bottom) * 100%);
                left: var(--anchor-point);
                transform: translate(-50%, -50%) rotate(45deg);
                background: var(--background-light);
            }
            div.info-field {
                display: grid;
                grid-template-columns: auto auto;
            }
            span.info-field-name {
                padding-right: 1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span.info-field-value {
                display: flex;
                align-items: center;
                justify-content: right;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            hr {
                border: 1px solid var(--secondary);
            }
            div.title {
                flex: 0 0 auto;
                font-size: 1.2rem;
                padding: 1rem 0 0 1rem;
                font-family: Roboto, sans-serif;
                position: absolute;
                z-index: 10;
                left: 0;
                top: 0;
                pointer-events: none;
            }
            div#map-legend {
                z-index: 9;
                position: absolute;
                padding: 0 1rem 1rem 0;
                bottom: 0;
                right: 0;
                font-size: 0.85rem;
                font-family: Roboto, sans-serif;
                display: grid;
                grid-template-columns: auto auto;
                grid-gap: 0.5rem;
                align-items: center;
                pointer-events: none;
            }
            span.color-gradiant {
                display: flex;
                flex-flow: column;
                align-items: center;
            }
            span.color-gradiant span.scale {
                display: block;
                height: 5rem;
                width: 0.65rem;
                box-shadow: var(--shadow-small);
                margin-top: 0.25rem;
                margin-bottom: 0.25rem;
            }
            span.color-block {
                display: block;
                height: 0.5rem;
                width: 0.5rem;
                box-shadow: var(--shadow-small);
            }
            div.no-data {
                font-family: Roboto, sans-serif;
                font-weight: 600;
                font-size: 2rem; 
                white-space: nowrap;
                text-transform: uppercase;
            }
        `;
    }

    static parseBinaryData(array_buffer) {
        const uint8_array = new Uint8Array(array_buffer);
        let len = 0;
        while(uint8_array[len] != 0) {
            len++;
        }
        const string_part = new Uint8Array(array_buffer, 0, len);
        const utf8_decoder = new TextDecoder();
        const data_view = new DataView(array_buffer, len + 1);
        len = 0;
        const coords = [];
        const num_poly = data_view.getUint32(len, true);
        len += 4;
        for (let p = 0; p < num_poly; p++) {
            coords.push([]);
            const num_path = data_view.getUint32(len, true);
            len += 4;
            for (let t = 0; t < num_path; t++) {
                coords[p].push([]);
                const num_cords = data_view.getUint32(len, true);
                len += 4;
                for (let c = 0; c < num_cords; c++) {
                    const lon = data_view.getInt32(len, true);
                    len += 4;
                    const lat = data_view.getInt32(len, true);
                    len += 4;
                    coords[p][t].push([lon, lat]);
                }
            }
        }
        return {
            name: utf8_decoder.decode(string_part),
            coords: coords,
        };
    }

    static project([lon, lat]) {
        return [
            (Math.PI + (lon * Math.PI / 180)),
            ((() => {
                if (Math.abs(lat) > 85) {
                    lat = Math.sign(lat) * 85;
                } 
                const phi = lat * Math.PI / 180;
                return Math.PI - Math.log(Math.tan(Math.PI / 4 + phi / 2));
            })())
        ];
    }

    static parseColor(str) {
        const match = str.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if(match) {
            return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
        } else {
            return [255, 255, 255];
        }
    }

    static blendColors(colors, proportion) {
        const ret = [0, 0, 0];
        const sum = proportion.reduce((a, b) => a + b, 0);
        if (sum === 0) {
            return colors[0] || ret;
        } else {
            colors.forEach((col, i) => ret.forEach((el, j) => ret[j] += col[j]*col[j]*proportion[i]));
            return ret.map(el => Math.sqrt(el / sum));
        }
    }

    static colorPropScale(prop) {
        return Math.log10(99 * prop + 1) / 2;
    }
    
    mouseMoveCallback(event) {
        let elem = event.target;
        if(elem?.tagName === 'path') {
            elem = elem.parentNode;
        }
        const info_box = this.shadowRoot.getElementById('info-box-wrapper');
        if(elem?.location_data) {
            const location = elem?.location_data;
            if (!info_box.current_location !== location) {
                const name = this.shadowRoot.getElementById('info-box-name');
                const map_wrapper = this.shadowRoot.getElementById('map-wrapper');
                name.innerText = location.name.split(',')[0];
                Array.from(info_box.getElementsByClassName('info-field-value')).forEach((el, i) => {
                    el.innerText = Math.round(location.data[i] * 100) / 100;
                });
                const elem_pos = elem.getBoundingClientRect();
                const map_wrapper_pos = map_wrapper.getBoundingClientRect();
                const x = elem_pos.x - map_wrapper_pos.x + elem_pos.width / 2;
                const y = elem_pos.y - map_wrapper_pos.y + elem_pos.height / 2;
                info_box.style.left = x + 'px';
                info_box.style.top = y + 'px';
                info_box.classList.add('visible');
                info_box.style.setProperty('--anchor-point', (x / map_wrapper.clientWidth * 90 + 5) + '%');
                info_box.style.setProperty('--anchor-at-bottom', (y > ((info_box.clientHeight + 12) * 1.2)) ? 1 : 0);
                info_box.current_location = location;
            }
        }
    }
    
    mouseOutCallback() {
        const info_box = this.shadowRoot.getElementById('info-box-wrapper');
        info_box.classList.remove('visible');
        info_box.current_location = null;
    }
    
    static map(value, min_in, max_in, min_out, max_out) {
        if(min_in === max_in) {
            return max_out;
        } else if(value < min_in) {
            return min_out;
        } else if(value > max_in) {
            return max_out;
        } else {
            return (value - min_in) / (max_in - min_in) * (max_out - min_out) + min_out;
        }
    }

    async drawMap() {
        const data = this.data;
        try {
            if (data?.locations?.length > 0) {
                const locations_promise = Promise.all(data.locations.map(async location => {
                    if(location) {
                        if (!location_cache[location]) {
                            try {
                                const res = await fetch(`${data_location}/${location}.bin`);
                                if(res.ok) {
                                    const data = MapRenderer.parseBinaryData(await res.arrayBuffer());
                                    data.coords = data.coords.map(poly => poly.map(part => (
                                        part.map(([lon, lat]) => MapRenderer.project([lon / 1e7, lat / 1e7]).map(el => 1000 * el))
                                    )));
                                    location_cache[location] = {
                                        name: data.name,
                                        min: data.coords.reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), [])
                                            .reduce((a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1])]),
                                        max: data.coords.reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), [])
                                            .reduce((a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1])]),
                                        svg: data.coords.map(poly => (
                                            svg`<path d="${poly.map((part, i) => (
                                                (i == 0 ? part : part.reverse())
                                                    .map((coord, i) => (
                                                        i == 0
                                                            ? 'M ' + coord[0] + ',' + coord[1]
                                                            : 'L ' + coord[0] + ',' + coord[1]
                                                    )).join(' ') + ' z'
                                            )).join(' ')
                                                }"/>`
                                        )),
                                    };
                                } else {
                                    location_cache[location] = null;
                                }
                            } catch (e) {
                                return null;
                            }
                        }
                        return location_cache[location];
                    } else {
                        return null;
                    }
                }));
                if(data.title) {
                    document.title = data.title;
                }
                const color_data = data.data.map(row => data.color_using ? data.color_using.map(el => row[el]) : row);
                const defcolor = MapRenderer.parseColor(data.defcolor || "#ffffff");
                let colors;
                if (color_data?.[0]?.length > 0) {
                    const max_data = color_data.reduce((a, b) => a.map((el, i) => Math.max(el, b[i])));
                    const min_data = color_data.reduce((a, b) => a.map((el, i) => Math.min(el, b[i])));
                    colors = color_data.map(data_vec => {
                        if (data_vec.length == 1) {
                            const color = MapRenderer.parseColor(data.colors[0]);
                            const prop = MapRenderer.colorPropScale(MapRenderer.map(data_vec[0], min_data[0], max_data[0], 0, 1));
                            return MapRenderer.blendColors([color, defcolor], [prop, 1 - prop]);
                        } else {
                            const sum = data_vec.reduce((a, b) => a + b);
                            const colors = data.colors.map(col => MapRenderer.parseColor(col));
                            const prop = data_vec.map(el => (sum !== 0 ? el / sum : 1));
                            return MapRenderer.blendColors(colors, prop);
                        }
                    });
                } else {
                    colors = data.locations.map(() => defcolor);
                }
                const locations = (await locations_promise).map((loc, i) => loc ? { ...loc, data: data.data[i], columns: data.columns } : null);
                if(locations.filter?.(loc => loc).length == 0) {
                    throw 'No data';
                }
                const min = locations.filter(loc => loc).map(loc => loc.min).reduce((a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1])]);
                const max = locations.filter(loc => loc).map(loc => loc.max).reduce((a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1])]);
                const data_min = color_data.reduce((a, b) => a.map((el, i) => Math.min(el, b[i])));
                const data_max = color_data.reduce((a, b) => a.map((el, i) => Math.max(el, b[i])));
                return html`
                    <div id="map-wrapper">
                        <div id="info-box-wrapper">
                            <div id="info-box-background"></div>
                            <div id="info-box">
                                <div id="info-box-name"></div>
                                <hr />
                                <div class="info-field">
                                    ${data.columns.map(col => (html`
                                        <span class="info-field-name">${col}</span>
                                        <span class="info-field-value"></span>
                                    `))}
                                </div>
                            </div>
                        </div>
                        <svg
                            class="wrapping-svg"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="${min[0] + " " + min[1] + " " + (max[0] - min[0]) + " " + (max[1] - min[1])}"
                        >
                            <filter id="dropshadow" height="130%">
                              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                              <feOffset dx="2" dy="2" result="offsetblur"/>
                              <feComponentTransfer>
                                <feFuncA type="linear" slope="0.25"/>
                              </feComponentTransfer>
                              <feMerge> 
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                            ${locations.map((loc, i) => (svg`
                                <g class="geometry" style="${styleMap({
                                    fill: `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`,
                                })}" .location_data="${loc}"
                                    @mousemove="${this.mouseMoveCallback}"
                                    @mouseout="${this.mouseOutCallback}"
                                    @mousedown="${this.mouseMoveCallback}"
                                >
                                    ${loc?.svg}
                                </g>
                            `))}
                        </svg>
                    </div>
                    <div class="title">${data.title}</div>
                    <div id="map-legend">${
                        color_data?.[0]?.length > 1
                            ? (data.colors.map((col, i) => (html`
                                <span class="legend-label">${data.color_using ? data.columns[data.color_using[i]] : data.color_using[i]}</span>
                                <span class="color-block" style="${styleMap({
                                background: col,
                            })}"></span>
                            ` )))
                            : (data.colors.length >= 1
                                ? (html`
                                    <span class="legend-label">${data.color_using ? data.columns[data.color_using[0]] : data.color_using[0]}</span>
                                    <span class="color-gradiant">
                                        <span>${Math.round(data_max[0] * 100) / 100}</span>
                                        <span class="scale" style="${styleMap({
                                            background: `linear-gradient(${data.colors[0]},${data.defcolor})`,
                                        })}"></span>
                                        <span>${Math.round(data_min[0] * 100) / 100}</span>
                                    </span>
                                `)
                                : null
                            )
                    }</div>
                `;
            } else {
                throw 'No data';
            }
        } catch (e) {
            return html`<div class="no-data">No data</div>`
        }
    }

    render() {
        return html`
            <div id="map-renderer-root">
                ${until(this.drawMap(), html`<ui-spinner></ui-spinner>`)}
            </div>
        `;
    }

}

customElements.define('map-renderer', MapRenderer);
