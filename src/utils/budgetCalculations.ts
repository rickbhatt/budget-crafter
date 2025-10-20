/**
 * Calculates budget and expense percentages
 * @param totalExpense - The total amount spent
 * @param budgetAmount - The total budget allocated
 * @returns Object containing expense percentage, remaining percentage, and over-budget status
 */
export const calculateBudgetPercentages = (
  totalExpense: number,
  budgetAmount: number
) => {
  // If no budget, return zeros
  if (budgetAmount === 0) {
    return {
      expensePercentage: 0,
      remainingPercentage: 0,
      isOverBudget: false,
    };
  }

  // Calculate expense percentage (capped at 100%)
  const expensePercentage = Math.min(
    (totalExpense / budgetAmount) * 100,
    100
  );

  // Calculate remaining percentage (minimum 0%)
  const remainingPercentage = Math.max(100 - expensePercentage, 0);

  // Check if over budget
  const isOverBudget = expensePercentage >= 100;

  return {
    expensePercentage,
    remainingPercentage,
    isOverBudget,
  };
};
