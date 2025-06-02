// Write your code here...
#include <iostream>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> bracketMap = {
        {')', '('},
        {']', '['},
        {'}', '{'}
    };

    for (char ch : s) {
        // If it's a closing bracket
        if (bracketMap.count(ch)) {
            // Check if top of the stack matches expected opening bracket
            if (!st.empty() && st.top() == bracketMap[ch]) {
                st.pop();  // matched, remove opening
            } else {
                return false;  // mismatch
            }
        } else {
            // opening bracket: push onto stack
            st.push(ch);
        }
    }

    return st.empty();  // valid only if no unmatched brackets
}

int main() {
    string s;
    cin >> s;

    if (isValid(s)) {
        cout << "YES\n";
    } else {
        cout << "NO\n";
    }

    return 0;
}
