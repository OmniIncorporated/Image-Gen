export default function groupBy(array, amount) {
    const groups = [];
    for (let i = 0; i < array.length; i += amount) {
        groups.push(array.slice(i, i + amount));
    }
    return groups;
}