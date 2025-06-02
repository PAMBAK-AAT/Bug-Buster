// Write your code here...
import java.util.*;

public class GenerateAllSubsets {
    static List<List<Integer>> result = new ArrayList<>();
    
    public static void backtrack(int[] nums, int start, List<Integer> tempList) {
        // We don't add empty subset to result, only non-empty subsets
        if (!tempList.isEmpty()) {
            result.add(new ArrayList<>(tempList));
        }

        for (int i = start; i < nums.length; i++) {
            tempList.add(nums[i]);
            backtrack(nums, i + 1, tempList);
            tempList.remove(tempList.size() - 1);
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        Arrays.sort(nums);  // Sort to ensure non-descending order in subsets
        
        backtrack(nums, 0, new ArrayList<>());
        
        for (List<Integer> subset : result) {
            for (int num : subset) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
        
        sc.close();
    }
}
