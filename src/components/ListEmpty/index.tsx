import { Container, Message } from './style'

type ListEmpty = {
  message: string
}

export function ListEmpty({ message }: ListEmpty) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}
