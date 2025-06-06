// Write your code here...

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    
    for (int i = 0; i < n; ++i)
        cin >> nums[i];
    
    cin >> target;

    unordered_map<int, int> mp; // value -> index

    for (int i = 0; i < n; ++i) {
        int complement = target - nums[i];
        if (mp.find(complement) != mp.end()) {
            cout << mp[complement] << " " << i << endl;
            return 0;
        }
        mp[nums[i]] = i;
    }

    // If no solution found (according to problem, always exists)
    cout << "-1 -1\n";
    return 0;
}
