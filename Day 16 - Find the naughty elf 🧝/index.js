import { workshopData } from './data.js'

function findNaughtyElf(data) {
  const naughtyElves = []
  
  data.forEach((elf) => {
    const totalShipped = {}
    
    // Flatten and sum all shipped toys using Object.entries
    const countToys = (obj) => {
      Object.entries(obj).forEach(([_, value]) => {
        if (Array.isArray(value)) {
          value.forEach(({toy, count}) => {
            totalShipped[toy] = (totalShipped[toy] || 0) + count
          })
        } else if (typeof value === 'object') {
          countToys(value)
        }
      })
    }
    
    countToys(elf.toysShipped)
    
    // Check for discrepancies
    const hasDiscrepancy = Object.entries(elf.toysMade).some(([toy, count]) => 
      count > (totalShipped[toy] || 0)
    )
    
    if (hasDiscrepancy) {
      naughtyElves.push(elf.name)
    }
  })
  
  return naughtyElves.join(', ')
}

console.log(findNaughtyElf(workshopData))

