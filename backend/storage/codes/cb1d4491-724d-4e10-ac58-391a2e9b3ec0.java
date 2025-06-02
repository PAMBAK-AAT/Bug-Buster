// Write your code here...
#include <bits/stdc++.h>
using namespace std;

void backtrack(vector<int>& nums, int start, vector<int>& curr, vector<vector<int>>& result) {
    for (int i = start; i < (int)nums.size(); ++i) {
        curr.push_back(nums[i]);
        result.push_back(curr);
        backtrack(nums, i + 1, curr, result);
        curr.pop_back();
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; 
    cin >> n;
    vector<int> nums(n);
    for (int &x : nums) cin >> x;

    sort(nums.begin(), nums.end());

    vector<vector<int>> result;
    vector<int> curr;

    backtrack(nums, 0, curr, result);

    // Print each subset in any order
    for (auto &subset : result) {
        for (int i = 0; i < (int)subset.size(); ++i) {
            cout << subset[i] << (i == (int)subset.size() - 1 ? "\n" : " ");
        }
    }

    return 0;
}
