var twoSum = function (nums, target) {
    let map = {};
    let index = 0;
    let ans = [];
    for (const num of nums) {
        const required = target - num;
        if (map[required] != undefined) {
            ans.push(map[required]);
            ans.push(index);
            break;
        }
        map[num] = index;
        index++;
    }
    return ans;
};

console.log(twoSum([2, 6, 5, 8, 11], 14));