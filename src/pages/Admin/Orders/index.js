import React from 'react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'

import { Table, Thead, Th, Tr, Td, Tbody, TableCaption, Text} from '@chakra-ui/react'

function Orders() {
    const {isLoading, isError, data, error } = useQuery(
        ["admin:orders"],  
       () =>  fetchOrders())

    if(isLoading) {
      return  <div>Loading...</div>
    }

    if(isError) {
        return  <div>Error {error.message}</div>
      }

      console.log(data);

  return (
    <>
    <Text fontSize='2xl'>
        Orders
    </Text>

    <Table variant='simple'>
        <TableCaption>Orders menu</TableCaption>
        <Thead>
            <Tr>
                <Th>User</Th>
                <Th>Address</Th>
                <Th>Product</Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                data.map((item) => (
                    <Tr key={item._id}>
                        <Td>{item.user.email}</Td>
                        <Td>{item.adress}</Td>
                        <Td>{item.items.length}</Td>
                    </Tr>
                ))
            }
        </Tbody>
    </Table>

    </>
  )
}

export default Orders
