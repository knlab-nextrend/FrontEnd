import React from 'react' 
import styled from 'styled-components'
function CountryCategoryModal({title="modal Title"}){
    return (
        <>  
            <Wrapper>
                <Header>{title}</Header>
            </Wrapper>
        
        </> 
    )
}

const Wrapper = styled.div` 
    display:flex;
`

const Header = styled.div` 

`

const Body = styled.div` 

`

const Footer = styled.div` 

`
export default CountryCategoryModal;