import React from 'react'
import './RecentTransactions.css'

const RecentTransactions = props => {

  return (
    <table id="refillLog" className='container'>
      <tbody>
        {/* <tr>
          <th>Date</th>
          <th>Action</th>
          <th className="qty">Qty</th>
        </tr> */}
        <tr>
          <td>18-Oct-18</td>
          <td>18L ADD</td>
          <td className="qty">10</td>
        </tr>
        <tr>
          <td>10-Sep-18</td>
          <td>18L REFILL</td>
          <td className="qty">9</td>
        </tr>
        <tr>
          <td>12-Aug-18</td>
          <td>18L REFILL</td>
          <td className="qty">2</td>
        </tr>
        <tr>
          <td>13-Jul-18</td>
          <td>18L REFILL</td>
          <td className="qty">4</td>
        </tr>
        <tr>
          <td>16-Jun-18</td>
          <td>18L ADD</td>
          <td className="qty">25</td>
        </tr>
        <tr>
          <td>16-Jun-18</td>
          <td>18L ADD</td>
          <td className="qty">25</td>
        </tr>
        <tr>
          <td>16-Jun-18</td>
          <td>18L ADD</td>
          <td className="qty">25</td>
        </tr>
        <tr>
          <td>16-Jun-18</td>
          <td>18L ADD</td>
          <td className="qty">25</td>
        </tr>
        <tr>
          <td>16-Jun-18</td>
          <td>18L ADD</td>
          <td className="qty">25</td>
        </tr>
      </tbody>
    </table>
  )
}

export default RecentTransactions