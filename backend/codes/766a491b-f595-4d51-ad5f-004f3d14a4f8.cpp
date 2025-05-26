// Write your code here...

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSubarraySum(const vector<int>& arr) {
    int maxEndingHere = arr[0];
    int maxSoFar = arr[0];

    for (size_t i = 1; i < arr.size(); i++) {
        maxEndingHere = max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int &x : arr) cin >> x;

    cout << maxSubarraySum(arr) << "\n";
    return 0;
}
