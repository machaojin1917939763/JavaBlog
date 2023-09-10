---
title: 和为 K 的子数组
order: 2
category:
  - LeetCode
tag:
  - LeetCode
---

> Problem: [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/description/)

## 思路

> 前缀和思想，先计算出数组的前缀和，然后通过双指针算法，计算出所有的可能

## 解题方法

> 前缀和和双指针

## 复杂度

- 时间复杂度: 
> 添加时间复杂度, 示例： $O(nlogn)$

- 空间复杂度: 
> 添加空间复杂度, 示例： $O(n)$

## Code

```Java []

class Solution {
    public int subarraySum(int[] nums, int k) {
        //前缀和思想
        int[] sum = new int[nums.length];
        sum[0] = nums[0];
        for(int i = 1;i < nums.length;i++){
            sum[i] = sum[i - 1] + nums[i];
        }
        int count = 0;
        for(int i = 0;i < nums.length;i++){
            if(sum[i] == k){
                count++;
            }
            for(int j = i + 1;j < nums.length;j++){
                if(sum[j] - sum[i] == k){
                    count++;
                }
            }
        }
        return count;
    }
}
```