https://leetcode.cn/problems/compare-version-numbers/description/

var compareVersion = function(version1, version2) {
    const a = version1.split(".");
    const b = version2.split(".");
    const n = a.length, m = b.length;
    for (let i = 0; i < n || i < m; i++) {
        const ver1 = i < n ? parseInt(a[i]) : 0;
        const ver2 = i < m ? parseInt(b[i]) : 0;
        if (ver1 !== ver2) {
            return ver1 < ver2 ? -1 : 1;
        }
    }
    return 0;
};

const version1 = "1.01", version2 = "1.001"
console.log(compareVersion(version1, version2))