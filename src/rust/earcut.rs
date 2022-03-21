
#[derive(Clone)]
struct Node {
    x: f64, y: f64,
    next: usize, prev: usize,
}

impl PartialEq for Node {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}

pub fn triangulate(vertex: &[f64], holes: &[usize], min: [f64; 2], max: [f64; 2]) -> Vec<usize> {
    let node_len = vertex.len() / 2;
    let mut nodes = Vec::with_capacity(node_len + 2 * holes.len());
    for i in 0..node_len {
        nodes.push(Node {
            x: vertex[2*i], y: vertex[2*i + 1],
            next: (i + 1) % node_len, prev: (node_len + i - 1) % node_len,
        });
    }
    let outer_len = if holes.len() > 0 { holes[0] } else { node_len };
    create_list(&mut nodes, 0, outer_len, false);
    if holes.len() > 0 {
        eliminate_holes(&mut nodes, holes, 0);
    }
    let mut inv_size = f64::max(max[0] - min[0], max[1] - min[0]);
    inv_size = if inv_size != 0.0 { 1.0 / inv_size } else { 0.0 };
    let mut triangles = Vec::with_capacity(3 * (node_len + 2 * holes.len()));
    apply_earcut(&mut nodes, 0, &mut triangles);
    return triangles;
}

fn tri_area(a: &Node, b: &Node, c: &Node) -> f64 {
    (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
}

fn point_in_triangle(a: &Node, b: &Node, c: &Node, p: &Node) -> bool {
    tri_area(p, c, a) <= 0.0 && tri_area(p, a, b) <= 0.0 && tri_area(p, b, c) <= 0.0
}

fn poly_area(nodes: &[Node], head: usize) -> f64 {
    let mut sum = 0.0;
    let mut last = nodes[head].prev;
    let mut cur = head;
    loop {
        sum += (nodes[last].x - nodes[cur].x) * (nodes[cur].y + nodes[last].y);
        last = cur;
        cur = nodes[cur].next;
        if cur == head {
            break;
        }
    }
    return sum;
}

fn lines_intersect(a0: &Node, b0: &Node, a1: &Node, b1: &Node) -> bool {
    let o1 = tri_area(a0, b0, a1).signum();
    let o2 = tri_area(a0, b0, b1).signum();
    let o3 = tri_area(a1, b1, a0).signum();
    let o4 = tri_area(a1, b1, b0).signum();
    return o1 != o2 && o3 != o4
        || (o1 == 0.0 && point_on_segment(a0, b0, a1))
        || (o2 == 0.0 && point_on_segment(a0, b0, b1))
        || (o3 == 0.0 && point_on_segment(a1, b1, a0))
        || (o4 == 0.0 && point_on_segment(a1, b1, b0));
}

fn point_on_segment(a: &Node, b: &Node, p: &Node) -> bool {
    p.x <= f64::max(a.x, b.x) && p.x >= f64::min(a.x, b.x)
    && p.y <= f64::max(a.y, b.y) && p.y >= f64::min(a.y, b.y)
}

fn remove_node(nodes: &mut [Node], node: usize) {
    let prev = nodes[node].prev;
    let next = nodes[node].next;
    nodes[prev].next = next;
    nodes[next].prev = prev;
}

fn create_list(nodes: &mut [Node], from: usize, to: usize, rev: bool) {
    nodes[to - 1].next = from;
    nodes[from].prev = to - 1;
    if rev == (poly_area(nodes, from) > 0.0) {
        let mut cur = from;
        loop {
            std::mem::swap(&mut nodes[cur].prev, &mut nodes[cur].next);
            cur = nodes[cur].prev;
            if cur == from {
                break;
            }
        }
    }
}

fn filter_points(nodes: &mut [Node], head: usize) -> usize {
    let mut end = head;
    let mut cur = head;
    while cur != nodes[cur].next {
        let prev = nodes[cur].prev;
        let next = nodes[cur].next;
        if nodes[cur] == nodes[next]
            || tri_area(&nodes[prev], &nodes[cur], &nodes[next]) == 0.0
        {
            remove_node(nodes, cur);
            cur = prev;
            end = cur;
        } else {
            cur = next;
            if cur == end {
                break;
            }
        }
    }
    return cur;
}

fn find_leftmost(nodes: &[Node], head: usize) -> usize {
    let mut max = head;
    let mut cur = head;
    loop {
        if nodes[cur].x < nodes[max].x || (nodes[cur].x == nodes[max].x && nodes[cur].y < nodes[max].y) {
            max = cur;
        }
        cur = nodes[cur].next;
        if cur == head {
            break;
        }
    }
    return max;
}

fn eliminate_holes(nodes: &mut Vec<Node>, holes: &[usize], outer: usize) {
    let mut queue = Vec::new();
    for i in 0..holes.len() {
        let start = holes[i];
        let end = if i + 1 == holes.len() { nodes.len() } else { holes[i + 1] };
        create_list(nodes, start, end, true);
        queue.push(find_leftmost(nodes, start));
    }
    queue.sort_by(|a, b| nodes[*a].x.partial_cmp(&nodes[*b].x).unwrap());
    for q in queue {
        eliminate_hole(nodes, q, outer);
    }
}

fn eliminate_hole(nodes: &mut Vec<Node>, hole: usize, outer: usize) {
    let bridge = find_bridge_point(nodes, hole, outer);
    create_bridge(nodes, bridge, hole);
}

fn find_bridge_point(nodes: &[Node], hole: usize, outer: usize) -> usize {
    return outer;
}

fn create_bridge(nodes: &mut Vec<Node>, a: usize, b: usize) {
    let a2 = nodes.len();
    nodes.push(nodes[a].clone());
    let b2 = nodes.len();
    nodes.push(nodes[b].clone());
    let a_next = nodes[a].next;
    let b_prev = nodes[b].prev;
    nodes[a2].next = a_next;
    nodes[a_next].prev = a2;
    nodes[a2].prev = b2;
    nodes[b2].next = a2;
    nodes[b2].prev = b_prev;
    nodes[b_prev].next = b2;
    nodes[a].next = b;
    nodes[b].prev = a;
}

fn resolve_intersections(nodes: &mut [Node], head: usize, triangles: &mut Vec<usize>) -> usize {
    let mut stop = head;
    let mut cur = head;
    while nodes[cur].prev != nodes[cur].next {
        let prev = nodes[cur].prev;
        let next = nodes[cur].next;
        let next2 = nodes[next].next;
        if prev != next2 && lines_intersect(&nodes[prev], &nodes[cur], &nodes[next], &nodes[next2]) {
            triangles.push(prev);
            triangles.push(cur);
            triangles.push(next);
            remove_node(nodes, cur);
            remove_node(nodes, next);
            cur = next2;
            stop = cur;
        } else {
            cur = next;
            if cur == stop {
                break;
            }
        }
    }
    return cur;
}

fn apply_earcut(nodes: &mut [Node], head: usize, triangles: &mut Vec<usize>) {
    let mut pass = 0;
    let mut cur = head;
    while nodes[cur].prev != nodes[cur].next && pass < 3 {
        if pass == 1 {
            cur = filter_points(nodes, cur);
        } else if pass == 2 {
            cur = resolve_intersections(nodes, cur, triangles);
            cur = filter_points(nodes, cur);
        }
        let mut stop = cur;
        while nodes[cur].prev != nodes[cur].next {
            let prev = nodes[cur].prev;
            let next = nodes[cur].next;
            if is_ear(nodes, cur) {
                triangles.push(prev);
                triangles.push(cur);
                triangles.push(next);
                remove_node(nodes, cur);
                cur = nodes[next].next;
                stop = cur;
            } else {
                cur = next;
                if cur == stop {
                    break;
                }
            }
        }
        pass += 1;
    }
}

fn is_ear(nodes: &[Node], node: usize) -> bool {
    let a = &nodes[nodes[node].prev];
    let b = &nodes[node];
    let c = &nodes[nodes[node].next];
    if tri_area(a, b, c) >= 0.0 {
        return false;
    }
    let mut cur = nodes[nodes[node].next].next;
    loop {
        let prev = nodes[cur].prev;
        let next = nodes[cur].next;
        if point_in_triangle(a, b, c, &nodes[cur]) && tri_area(&nodes[prev], &nodes[cur], &nodes[next]) >= 0.0 {
            return false;
        }
        cur = next;
        if cur == nodes[node].prev {
            break;
        }
    }
    return true;
}

