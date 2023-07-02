import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Value = styled.span`
  margin-left: 10px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

export const SubTitle = styled.h2`
  width: fill-available;
  margin: 15px;
  font-size: 25px;
  font-weight: 900;
  padding: 10px;
  background-color: lime;
  color: white;
`;
