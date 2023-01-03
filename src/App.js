
import React from 'react';
import * as Covalent from './balance.js';
import * as Unstoppable from './domain.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.process = this.process.bind(this);
    this.onImageError = this.onImageError.bind(this);
    this.state = { searching: false, tokenList: [] };
  }

  async process(e) {
    e.preventDefault();

    let domain = document.getElementById('input-search').value;
    let chain = document.getElementById('select-chain').value;

    if (!domain) return;

    this.setState({ searching: true, tokenList: [] });

    Unstoppable.getDomainInfo(domain).then(domainInfo => {
      let address = domainInfo.meta.owner;
      if (!address) 
      alert("Domain not found ⚠️");
      return Covalent.getTokenBalances(chain, address);
      
    }).then(balances => {
      this.setState({tokenList: balances.data.items });
    }).catch(e => {
      console.error(e);
    }).finally(() => {
      this.setState({searching: false });
    })

  }
  onImageError(index) {
    let noLogo = '<i class="bi bi-question-circle" style="font-size: 1.4rem;"></i>';
    document.getElementById('token-logo-' + index).innerHTML = noLogo;
  }

   
  render() {
    return (
      <div className="container py-5">
          <div className='shadow p-4 mb-4'>
            <h1 className="pt-2 pb-4">Check Wallet Balance using Unstoppable</h1> 
            <form onSubmit={this.process}>
              <div className="mb-3">
                <input type="text" id="input-search" className="form-control form-control-lg" placeholder="Enter the unstoppable domain" autoComplete="off" required/>
              </div>
              <div className="mb-4">
                <label htmlFor="select-chain" className="form-label">Blockchain</label>
                <select id="select-chain" className="form-select" style={{ cursor: 'pointer' }}>
                    <option value="1">Ethereum</option>
                    <option value="56">Binance</option>
                    <option value="137">Polygon </option>
                    <option value="43114">Avalanche</option>
                    <option value="42161">Arbitrum</option>
                    <option value="1284">Moonbeam</option>
                    <option value="80001">Polygon Testnet</option>
                    <option value="42">Kovan</option>
                    <option value="43113">Fuji Avalanche testnet</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary"><i className="bi bi-search me-2"></i> Show Wallet</button>
              {this.state.searching &&
              <div className="spinner-border spinner-border-sm ms-4"  style={{ width: '1.6rem', height: '1.6rem' }}  role="status">
                <span></span>
              </div>
              } 
            </form>
          </div>

          <table className="table table-striped">
            <tbody>
              { this.state.tokenList.map((token, index) => 
                <tr key={index}>
                  <td id={ 'token-logo-' + index } className="text-center" style={{ width: '2.5rem' }}>
                    <img className="img-fluid" 
                          style={{ width: '1.5rem', height: '1.5rem'  }} 
                          src={ token.logo_url }
                          onError={ () => this.onImageError(index) }
                          alt="" />
                  </td>
                  <td className="fw-bold" style={{ width: '4rem' }}>{ token.contract_ticker_symbol }</td>
                  <td style={{ width: '12rem' }}>{ token.contract_name }</td>
                  <td className='text-muted'>${ token.quote }</td>
                </tr>
                ) }
            </tbody>
          </table>

      </div>
    );
  }
}

export default App;
