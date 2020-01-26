
/* const a = 'a/b/c/d.s/index.html';
const b = 'a/b/c'; */

export default (a, b, sep) => {
    const pathA = markAsDir(unixify(a)).split('/');
    const pathB = unixify(b).split('/');

    let i;
    for (i = 0; i < pathA.length; i++) {
        if (pathA[i] === pathB[i]) {
            continue;
        }
        break;
    }

    const out = [];

    for (let fromA = pathA.length - 1; fromA > i; fromA--) {
        out.push('..');
    }

    for (let fromB = i; fromB < pathB.length; fromB++) {
        out.push(pathB[fromB]);
    }

    return out.join(sep);
}


function markAsDir(path) {
    if (path.charAt(path.length - 1) === '/') return path;
    const tokens = path.split('/');
    const leaf = tokens[tokens.length - 1];

    return leaf.indexOf('.') === -1
        ? path + '/'
        : path;
}

function unixify(str) {
    return str.replace(/[\\\/]+/g, '/');
}
