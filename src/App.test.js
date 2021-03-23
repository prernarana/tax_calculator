import { render, screen } from '@testing-library/react';
import App from './App';
import calculateTax from '../src/components/utils/taxUtil';


test('renders Tax Calculator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tax Calculator/i);
  expect(linkElement).toBeInTheDocument();
});


test('Loading Tax Slabs test', () => {
  render(<App />);
    const linkElement = screen.getByText(/Loading Tax Slabs.../i);
    expect(linkElement).toBeInTheDocument();
 });

describe('Tax Util Class Test',()=>{
  let slab = {
    "tax_brackets": [
      {
        "max": 47630, 
        "min": 0, 
        "rate": 0.15
      }, 
      {
        "max": 95259, 
        "min": 47630, 
        "rate": 0.205
      }, 
      {
        "max": 147667, 
        "min": 95259, 
        "rate": 0.26
      }, 
      {
        "max": 210371, 
        "min": 147667, 
        "rate": 0.29
      }, 
      {
        "min": 210371, 
        "rate": "0.33"
      }
    ]
  }
  
  test(' calculate tax in slab 1', () => {
    let data = calculateTax (slab,2000)
    expect(  data.avgTax).toBe(.15);
    expect(data.totalTax).toBe(300);
  });

  test(' calculate tax in slab 2', () => {
    let data = calculateTax (slab,50000)
    expect(  data.avgTax.toFixed(3)).toBe("0.153");
    expect(data.totalTax).toBe(7630.35);
  });

  test(' calculate tax in slab 3', () => {
    let data = calculateTax (slab,147668)
    expect(  data.avgTax.toFixed(3)).toBe("0.207");
    expect(data.totalTax.toFixed(2)).toBe("30534.82");
  });

  test(' calculate tax in last', () => {
    let data = calculateTax (slab,210371)
    expect(  data.avgTax.toFixed(3)).toBe("0.232");
    expect(data.totalTax.toFixed(2)).toBe("48718.68");
  });
})


