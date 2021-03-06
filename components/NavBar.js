import styled from 'styled-components'
import { useWallet } from '../hooks/useWallet'

import ConnectButton from './ui/ConnectButton'

const Wrapper = styled.div``

const NavBar = () => {
  const {
    provider,
    web3Provider,
    address,
    chainId,
    chainData,
    connect,
    disconnect,
  } = useWallet()

  return (
    <Wrapper>
      <h1>FWB Props</h1>
      <ul>
        {address && <li>{address}</li>}{' '}
        {chainId && <li>Using({chainData.name})</li>}
      </ul>{' '}
      {!address && (
        <div onClick={connect}>
          <ConnectButton />
        </div>
      )}
    </Wrapper>
  )
}

export default NavBar
