#include <bits/stdc++.h>
using namespace std;

void backtrack(vector<int>& nums, int start, vector<int>& curr, vector<vector<vector<int>>>& subsets_by_size) {
    if (!curr.empty()) {
        subsets_by_size[curr.size()].push_back(curr);
    }
    for (int i = start; i < (int)nums.size(); ++i) {
        curr.push_back(nums[i]);
        backtrack(nums, i + 1, curr, subsets_by_size);
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

    // subsets_by_size[i] stores all subsets of size i
    vector<vector<vector<int>>> subsets_by_size(n + 1);

    vector<int> curr;
    backtrack(nums, 0, curr, subsets_by_size);

    // For each size, sort subsets lex order
    for (int size = 1; size <= n; ++size) {
        sort(subsets_by_size[size].begin(), subsets_by_size[size].end());
        for (auto &subset : subsets_by_size[size]) {
            for (int i = 0; i < (int)subset.size(); ++i) {
                cout << subset[i] << (i == (int)subset.size() - 1 ? "\n" : " ");
            }
        }
    }

    return 0;
}

