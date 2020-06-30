import {
    TILE_TYPE_NAMED_MAP,
    TILE_TYPE_NUMBERED_MAP,
    START_TILE
} from './tileTypes';
import RNG from './RNG';

let rng = undefined;

export function initRNG(seed) {
    rng = new RNG(seed);
    return rng.seed;
}

/**
 *
 * @param {Map} stack A list of tiles to pick from.
 * @returns {Object} The selected tile and the index of that tile in the stack.
 */
export function pickRandomTile(stack = TILE_TYPE_NUMBERED_MAP) {
    const index = rng.range(0, stack.size);
    return { tile: stack.get(index), index };
}

/**
 *
 * @param {Number} numberToGenerate The number of tiles the function should return.
 * @returns {Map} A map of tiles.
 */
export function generateTiles(numberToGenerate) {
    let newTiles = new Map();
    for (let i = 0; i < numberToGenerate; i++) {
        const { tile } = pickRandomTile();
        newTiles.set(i, new Map(tile));
    }

    return newTiles;
}

/**
 * @returns {Map} First tile
 */

export function pickStartTile(extensions = []) {
    if (extensions.includes('Random start tile')) {
        return pickRandomTile().tile;
    }

    if (extensions.includes('River')) {
        return TILE_TYPE_NAMED_MAP.get('Spring');
    }

    return START_TILE;
}

/**
 *
 * @param {Map} stack A list of tiles to remove the tile from.
 * @returns {Object} The removed tile and the updated list of tiles.
 */
export function removeTileFromStack(stack) {
    if (stack.size === 0) {
        return { tile: undefined, updatedStack: stack };
    }

    const lastTile = stack.size - 1;
    const tile = stack.get(lastTile);
    const updatedStack = new Map(stack);
    updatedStack.delete(lastTile);

    return { tile, updatedStack };
}

/**
 *
 * @param {Array} nodesA A list of nodes.
 * @param {Array} nodesB A list of nodes.
 * @returns {Boolean}
 */
export function canConnectNodes(nodesA, nodesB) {
    if (nodesA.length !== 3 || nodesB.length !== 3) {
        return false;
    }

    for (let i = 0; i < 3; i++) {
        const featureA = nodesA[i].feature;
        const featureB = nodesB[i].feature;

        if (featureA !== featureB) {
            return false;
        }
    }

    return true;
}

export function createEdges(edges, nodesA, nodesB) {
    return;
}