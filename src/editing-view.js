
import { css, html, LitElement } from 'lit-element'
import { styleMap } from 'lit-html/directives/style-map';

import './map-renderer';
import Icon from './icon.svg';

const data = {
    title: 'Coronavirus in Südtirol',
    defcolor: '#f0fff0',
    locations: [
        '-47255', '-47338', '-47122', '-47284', '-47075', '-47247', '-47139',
        '-47266', '-47207', '-47173', '-47337', '-47300', '-47317',
        '-47272', '-47252', '-47145', '-47278', '-47203', '-47298',
        '-47322', '-47330', '-47331', '-47260', '-47290', '-47325',
        '-47318', '-47295', '-47309', '-47251', '-47121', '-47212',
        '-47269', '-47234', '-47324', '-47292', '-47305', '-47090',
        '-47074', '-47258', '-47275', '-47268', '-47262', '-47206',
        '-47187', '-47306', '-47302', '-47072', '-47291', '-47214',
        '-47283', '-47263', '-47089', '-47315', '-47323', '-47332',
        '-47245', '-47271', '-47314', '-47080', '-47313', '-47311',
        '-47297', '-47328', '-47326', '-47141', '-47336', '-47296',
        '-47280', '-47301', '-47339', '-47208', '-47320', '-47329',
        '-47308', '-47233', '-47321', '-47045', '-47335', '-47282',
        '-47303', '-47270', '-47294', '-47299', '-47286', '-47244',
        '-47310', '-47316', '-47319', '-47276', '-47246', '-47265',
        '-47334', '-47231', '-47279', '-47333', '-47237', '-47218',
        '-47304', '-47254', '-47285', '-47119', '-47102', '-47288',
        '-47213', '-47241', '-47307', '-47287', '-47277', '-47327',
        '-47232', '-47281', '-47274', '-47312', '-47164', '-47289',
        '-47242',
    ],
    columns: ['Covid-19 Infektionen', 'Einwohner', '% Infizierte'],
    colors: ['#ff0000', '#0000ff'],
    data: [
        [4, 3471, 4 / 3471 * 100], [33, 6015, 33 / 6015 * 100], [9, 1656, 9 / 1656 * 100], [8, 5025, 8 / 5025 * 100], [0, 395, 0 / 395 * 100], [1, 1038, 1 / 1038 * 100],
        [16, 3875, 16 / 3875 * 100], [4, 1754, 4 / 1754 * 100], [1290, 107407, 1290 / 107407 * 100], [23, 2783, 23 / 2783 * 100], [2, 2252, 2 / 2252 * 100], [116, 22572, 116 / 22572 * 100],
        [115, 16774, 115 / 16774 * 100], [8, 1903, 8 / 1903 * 100], [6, 1376, 6 / 1376 * 100], [5, 3977, 5 / 3977 * 100], [7, 3118, 7 / 3118 * 100], [88, 14932, 88 / 14932 * 100],
        [20, 2988, 20 / 2988 * 100], [6, 1005, 6 / 1005 * 100], [48, 2667, 48 / 2667 * 100], [21, 3298, 21 / 3298 * 100], [9, 1751, 9 / 1751 * 100], [2, 905, 2 / 905 * 100],
        [2, 2386, 2 / 2386 * 100], [5, 2325, 5 / 2325 * 100], [0, 780, 0 / 780 * 100], [24, 3349, 24 / 3349 * 100], [12, 3074, 12 / 3074 * 100], [46, 8085, 46 / 8085 * 100],
        [41, 3421, 41 / 3421 * 100], [3, 2286, 3 / 2286 * 100], [8, 6881, 8 / 6881 * 100], [17, 2927, 17 / 2927 * 100], [33, 5219, 33 / 5219 * 100], [0, 386, 0 / 386 * 100],
        [2, 2219, 2 / 2219 * 100], [2, 653, 2 / 653 * 100], [22, 4094, 22 / 4094 * 100], [5, 2746, 5 / 2746 * 100], [40, 12467, 40 / 12467 * 100], [14, 5198, 14 / 5198 * 100],
        [0, 338, 0 / 338 * 100], [313, 18029, 313 / 18029 * 100], [11, 1555, 11 / 1555 * 100], [28, 5287, 28 / 5287 * 100], [4, 1281, 4 / 1281 * 100], [2, 2814, 2 / 2814 * 100],
        [4, 829, 4 / 829 * 100], [236, 41170, 236 / 41170 * 100], [15, 1694, 15 / 1694 * 100], [7, 1714, 7 / 1714 * 100], [3, 2066, 3 / 2066 * 100], [8, 3161, 8 / 3161 * 100],
        [4, 1421, 4 / 1421 * 100], [15, 1979, 15 / 1979 * 100], [12, 5889, 12 / 5889 * 100], [7, 3245, 7 / 3245 * 100], [49, 5463, 49 / 5463 * 100], [18, 1602, 18 / 1602 * 100],
        [17, 3170, 17 / 3170 * 100], [8, 3815, 8 / 3815 * 100], [7, 1598, 7 / 1598 * 100], [20, 2860, 20 / 2860 * 100], [9, 1050, 9 / 1050 * 100], [34, 3090, 34 / 3090 * 100],
        [4, 737, 4 / 737 * 100], [15, 3646, 15 / 3646 * 100], [9, 654, 9 / 654 * 100], [1, 545, 1 / 545 * 100], [0, 256, 0 / 256 * 100], [33, 2911, 33 / 2911 * 100],
        [78, 4538, 78 / 4538 * 100], [1, 1394, 1 / 1394 * 100], [19, 7966, 19 / 7966 * 100], [1, 1262, 1 / 1262 * 100], [25, 3807, 25 / 3807 * 100], [38, 5517, 38 / 5517 * 100],
        [54, 7160, 54 / 7160 * 100], [6, 2916, 6 / 2916 * 100], [14, 6242, 14 / 6242 * 100], [6, 1839, 6 / 1839 * 100], [3, 1245, 3 / 1245 * 100], [135, 1879, 135 / 1879 * 100],
        [3, 2015, 3 / 2015 * 100], [7, 3569, 7 / 3569 * 100], [22, 3879, 22 / 3879 * 100], [7, 3244, 7 / 3244 * 100], [2, 1754, 2 / 1754 * 100], [4, 1541, 4 / 1541 * 100],
        [2, 4864, 2 / 4864 * 100], [45, 7044, 45 / 7044 * 100], [1, 1150, 1 / 1150 * 100], [7, 958, 7 / 958 * 100], [2, 1759, 2 / 1759 * 100], [52, 4538, 52 / 4538 * 100],
        [2, 1010, 2 / 1010 * 100], [6, 2443, 6 / 2443 * 100], [9, 1994, 9 / 1994 * 100], [12, 3346, 12 / 3346 * 100], [17, 3438, 17 / 3438 * 100], [1, 1056, 1 / 1056 * 100],
        [2, 1544, 2 / 1544 * 100], [1, 2911, 1 / 2911 * 100], [0, 760, 0 / 760 * 100], [17, 4794, 17 / 4794 * 100], [18, 1825, 18 / 1825 * 100], [9, 2571, 9 / 2571 * 100],
        [9, 3324, 9 / 3324 * 100], [5, 3616, 5 / 3616 * 100], [0, 973, 0 / 973 * 100], [0, 191, 0 / 191 * 100], [83, 2919, 83 / 2919 * 100], [18, 1999, 18 / 1999 * 100],
        [3, 1398, 3 / 1398 * 100], [0, 2586, 0 / 2586 * 100],
    ],
    color_using: [2],
};

class EditingView extends LitElement {

    static get styles() {
        return css`
            header {
                font-family: Roboto, sans-serif;
                font-size: 2rem;
                background: var(--background-dark);
                color: white;
                padding: 0.5rem;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                height: 2.75rem;
                box-shadow: var(--shadow-large);
                flex: 0 0 auto;
            }
            header img {
                width: 2rem;
                height: 2rem;
                pointer-events: none;
            }
            div.editing-view-root {
                height: 100%;
                width: 100%;
                display: flex;
                flex-flow: column;
            }
            div.content-root {
                display: flex;
                flex: 1 1 100%;
                flex-flow: row nowrap;
            }
            @media (max-aspect-ratio: 1) {
                div.content-root {
                    flex-flow: column;
                }
            }
            div.editing, div.renderer {
                flex: 1 1 50%;
                min-height: 50%;
                min-width: 50%;
            }
            div.renderer {
                box-shadow: var(--shadow-large);
            }
            :host {
                height: 100%;
                width: 100%;
                display: block;
            }
        `;
    }

    render() {
        return html`
            <div class="editing-view-root">
                <header><img src="${Icon}"/><span>Geo-Draw</span></header>
                <div class="content-root">
                    <div class="editing">

                    </div>
                    <div class="renderer">
                        <map-renderer
                            .data="${data}"
                        ></map-renderer>
                    </div>
                </div>
            </div>
        `;
    }

}

customElements.define('editing-view', EditingView);
