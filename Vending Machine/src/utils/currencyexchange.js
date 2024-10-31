export function getChange(bill, owed) {
    const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 1];
    let changeAmount = bill - owed;
    const change = [];
  
    denominations.forEach(denomination => {
      if (changeAmount >= denomination) {
        const count = Math.floor(changeAmount / denomination);
        change.push(`${count} P${denomination} ${denomination >= 20 ? 'bill' : 'coin'}`);
        changeAmount -= count * denomination;
      }
    });
  
    return change;
  }
  