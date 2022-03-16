import React, {useState} from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  StackDivider,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import useSWR, {useSWRConfig} from "swr";


const GET_TODO_URI = 'https://jsonplaceholder.typicode.com/todos';
// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json());

const Feature: React.FC<any> =
  ({title, desc, ...rest}) => {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  }

const HomePage: React.FC<any> = () => {

  const {mutate} = useSWRConfig()
  const [currentTodo, setCurrentTodo] = useState({title: '', body: ''})
  const {data} = useSWR(GET_TODO_URI, fetcher)

  return (
    <SimpleGrid>
      <Container maxW='container.lg'>
        <VStack
          spacing={5}
          align='center'
        >
          <Heading>Hello </Heading>
          <FormControl>

            <FormLabel htmlFor='todoTitle'>Title</FormLabel>
            <Input
              onChange={e => setCurrentTodo({...currentTodo, title: e.target.value})}
              id='title' type='text'/>

            <FormLabel htmlFor='todoBody'>Body</FormLabel>
            <Textarea
              onChange={e => setCurrentTodo({...currentTodo, body: e.target.value})}
              id='body'/>

            <Flex justify='center'>
              <Button
                onClick={e => {
                  e.preventDefault();
                  mutate(GET_TODO_URI).then(r => console.log('todos reloaded'))
                }}
                isFullWidth type='submit'>Add todo</Button>
            </Flex>
          </FormControl>
          <br/>
          <Divider/>
        </VStack>
      </Container>
      <Container>
        <VStack
          divider={<StackDivider borderColor='gray.200'/>}
          spacing={4}
          align='stretch'
        >{(!data ? [] : data).map((td: any, i: number) =>
          <Feature
            key={i}
            title={td.title}
            desc={td.title}
          />
        )}
        </VStack>
      </Container>
    </SimpleGrid>
  );
};

export default HomePage;

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

