https://leetcode.cn/problems/compare-version-numbers/description/

//一、简单做法，先把版本号字符串分割成数组，然后逐个比较
var compareVersion1 = function(version1, version2) {
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

//二、双指针法，直接在字符串上比较，不需要额外的空间
var compareVersion2 = function(version1, version2) {
    let i = 0, j = 0;

    while (i < version1.length || j < version2.length) {
        let num1 = 0, num2 = 0;

        while (i < version1.length && version1[i] !== '.') {
            num1 = num1 * 10 + parseInt(version1[i]);
            i++;
        }

        while (j < version2.length && version2[j] !== '.') {
            num2 = num2 * 10 + parseInt(version2[j]);
            j++;
        }

        if (num1 !== num2) {
            return num1 < num2 ? -1 : 1;
        }

        i++;
        j++;
    }

    return 0;
};

const version1 = "1.01", version2 = "1.001"
console.log(compareVersion2(version1, version2))