// @ts-expect-error - Generic fetch wrapper with rest parameters
const fether = (...args) => fetch(...args).then((res) => res.json());

export default fether;
