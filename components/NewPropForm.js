import styled from 'styled-components'
import { ethers } from 'ethers'
import { useState } from 'react'
import propsAbi from '../util/props-abi.json'

import { useWallet } from '../hooks/useWallet'

const PROPS_ADDRESS = 'TBD'

const Wrapper = styled.div``

const NewPropForm = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const { provider, web3Provider, address } = useWallet()

  async function setScore() {
    const contract = new ethers.Contract(PROPS_ADDRESS, propsAbi, web3Provider)
    setLoading(true)
    await contract.proposeNewScore('cid', count)
    setLoading(false)
  }

  return (
    <Wrapper>
      <h2>New Props:</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          setScore()
        }}
      >
        <input
          type="number"
          placeholder="props"
          onChange={e => setCount(e.target.value)}
          value={count}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Propose New Props'}
        </button>
      </form>
    </Wrapper>
  )
}

export default NewPropForm
