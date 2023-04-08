import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteProduct, fetchProductPost } from '../../../api'
import { Popconfirm, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';


function Products() {

  const queryClient = useQueryClient()// useQueryClient ile index.js deki queryClient a erisiyor

  const { isLoading, isError, data, error } = useQuery('admin:products', fetchProductPost)

  const deleteMutation = useMutation(deleteProduct,// veri eklemek silmek guncellemk icin useMutation kullanyoz
    {
      onSuccess: () => {
        console.log('success')
        queryClient.invalidateQueries('admin:products') // bunun icerisinde olan keye sahip querylery tekrara calisitirir
      }
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error {error.message}</div>
  }

  const { Column } = Table;
  //console.log(data)

  return (
    <div>
      <Table dataSource={data}>
        <Column title='Title' dataIndex='title' key='title' />
        <Column title='Price' dataIndex='price' key='price' />
        <Column title='Created At' dataIndex='createdAt' key='createdAt'
          render={(createdAt) => (
            <>
              {moment(createdAt).format('DD/MM/YYYY')}
            </>
          )} />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <>
              <Link style={{ marginRight: '10px' }} to={`/admin/products/${record._id}`}>Edit</Link>

              <Popconfirm
                title="Are you sure?"
                onConfirm={() => {
                  deleteMutation.mutate(record._id)/** urunu silme islemi */
                }}
                onCancel={() => {
                  console.log('Iptal')
                }}
                okText='Yes'
                cancelText='No'
                placement='left'
              >
                <Link>Delete</Link>
              </Popconfirm>

            </>
          )}
        />
      </Table>
    </div>
  )
}

export default Products