// Write your code here...
#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; ++i)
        cin >> arr[i];

    cin >> target;

    unordered_map<int, int> mp; // value -> index

    for (int i = 0; i < n; ++i) {
        int complement = target - arr[i];
        if (mp.find(complement) != mp.end()) {
            cout << mp[complement] << " " << i << endl;
            return 0;
        }
        mp[arr[i]] = i;
    }

    cout << "-1 -1\n"; // if no solution
    return 0;
}
