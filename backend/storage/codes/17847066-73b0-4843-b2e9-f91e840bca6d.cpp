// Write your code here...

#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; ++i) {
        cin >> arr[i];
    }

    cin >> target;

    unordered_map<int, int> numIndex; // value → index

    for (int i = 0; i < n; ++i) {
        int complement = target - arr[i];

        if (numIndex.find(complement) != numIndex.end()) {
            // Found the pair
            cout << numIndex[complement] << " " << i << endl;
            return 0;
        }

        // Store current number and its index
        numIndex[arr[i]] = i;
    }

    // If no solution is found (shouldn't happen as per problem description)
    cout << "No valid pair found" << endl;
    return 0;
}
