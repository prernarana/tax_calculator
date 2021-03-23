function TaxDetails(props) {
    return (
        <div><table className="table" >
            <thead>
                <tr>
                    <th width="25%">Slab (CAD)</th>
                    <th width="25%">Amount Taxable (CAD)</th>
                    <th width="25%">Tax %</th>
                    <th width="25%">Tax Payable (CAD)</th>
                </tr>
            </thead>
            <tbody>
                {props.calculatedTax.slabDetails.map((row) => <TableDataRow row={row} key={row.rate} />)}
                <tr>
                    <td></td>
                    <td></td>
                    <td><b>Total Tax Payable</b></td>
                    <td>{props.calculatedTax.totalTax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><b>Effective Tax %</b></td>
                    <td>{(props.calculatedTax.avgTax * 100).toFixed(3) + '%'}</td>
                </tr>
            </tbody>
        </table></div>
    )
}

function TableDataRow({ row }) {
    return (
        <tr>
            <td>{row.min}  {row.displayMax ? ' - ' + row.displayMax : 'and above'}</td>
            <td>{row.salary.toFixed(2)}</td>
            <td>{(row.rate * 100).toFixed(2) + '%'}</td>
            <td>{row.tax.toFixed(2)}</td>
        </tr>
    )
}

export default TaxDetails