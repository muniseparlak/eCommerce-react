import React, { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { Link } from 'react-router-dom'
import { Table, Popconfirm } from 'antd'
import { Text, Flex, Button } from '@chakra-ui/react'
import { deleteProduct } from '../../../api'

function Products() {

  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery(['admin:products'], () =>
  fetch('http://localhost:4000/product').then(res =>
    res.json()
  ))

  const deleteMutation = useMutation(deleteProduct, {
    refetchQueries: ['admin:products']
  })

  const columns = useMemo(() => {
    return [
      {
        title: 'Title',
        dataIndex : 'title',
        key: 'title'
      },
      {
        title: 'Price',
        dataIndex : 'price',
        key: 'price'
      },
      {
        title: 'Created At',
        dataIndex : 'created at',
        key: 'created at'
      },
      {
        title: 'action',
        key: 'action',
        render: (text, record) => (
          <>
          <Link to={`/admin/products/${record._id}`}>Edit</Link>
          <Popconfirm title='Are you sure?'
           onConfirm={() => deleteMutation.mutate(record._id, 
            {onSuccess : () => {console.log('success')
            queryClient.invalidateQueries('admin:products')
          }}
            )}
           onCancel={() => {console.log('iptal edildi')}}
           okText= 'Yes'
           cancelText= 'No'
           placement='left'>
            <a style={{marginLeft:10}}>Delete</a>
           </Popconfirm>
           
          </>
        )
      }
    ]
  }, [])

  if (isLoading) return <div>'Loading...'</div>

if (error) return <div>'An error has occurred: ' {error.message}</div>
console.log('data', data)


  return (
    <div>
      <Flex justifyContent={'space-between'}>
       <Text fontSize='2xl'>Products</Text>
      <Link to={'/admin/products/new'}>
       <Button>New</Button>
       </Link>
      </Flex>
       <Table dataSource={data} columns={columns} rowKey='_id'></Table>
    </div>
  )
}

export default Products
