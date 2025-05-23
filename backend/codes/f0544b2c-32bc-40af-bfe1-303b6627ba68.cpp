// Write your code here...

#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; i++) cin >> arr[i];

    cin >> target;

    unordered_map<int, int> mp;
    for (int i = 0; i < n; i++) {
        int complement = target - arr[i];
        if (mp.find(complement) != mp.end()) {
            cout << mp[complement] << " " << i << endl;
            return 0;
        }
        mp[arr[i]] = i;
    }

    cout << "-1 -1" << endl; // No valid pair found
    return 0;
}
