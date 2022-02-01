import {Button, Modal, Table} from "react-bootstrap";
import {add, IuserData, remove} from "../../redux/reducers/dataReducer/dataReducer";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";

const UserList = () => {

    const dispatch = useDispatch()
    const userList: IuserData[] = useSelector((state: any) => state.data.userList)

    const [removeModalShow , setRemoveModalShow] = useState<boolean>(false)
    const [removeUserId , setUserRemoveId] = useState<number | null>(null)

    return(
        <div className={'px-0 pt-3'}>
            <div className={'px-3 d-flex justify-content-between align-items-center border-bottom pb-3'}>
                <p className={'m-0 fs-3'}>User list</p>
                <Button variant={'primary'}
                    onClick={()=> dispatch(add({
                                                        id:userList.length === 0 ? 1 :
                                                            userList[userList.length-1].id + 1,
                                                        name:'ali',
                                                        email:'ali@ali.com',
                                                        city:'est',
                                                        userName:'ak'}))}
                >Add New</Button>
            </div>
            <div className={'px-1 pt-1'}>

                <Table responsive className={'text-center border mb-1'}>
                    <thead>
                    <tr className={'border-0 bg-light'}>
                        <th className={'py-4'}>id</th>
                        <th className={'py-4'}>Name</th>
                        <th className={'py-4'}>Username</th>
                        <th className={'py-4'}>Email</th>
                        <th className={'py-4'}>City</th>
                        <th className={'py-4'}>Edit</th>
                        <th className={'py-4'}>Delete</th>
                    </tr>
                    </thead>

                    {userList.length !== 0 &&
                        <tbody>
                        {userList.map((user) => {
                            return (
                                <tr key={`user-${user.id}`}>
                                    <td className={'py-4'}>{user.id}</td>
                                    <td className={'py-4'}>{user.name}</td>
                                    <td className={'py-4'}>{user.userName}</td>
                                    <td className={'py-4'}>{user.email}</td>
                                    <td className={'py-4'}>{user.city}</td>
                                    <td className={'py-4'}>
                                        <Link to={`/edit/${user.id}`}>
                                            <Button variant={'warning'} className={'w-75 text-light'}>Edit</Button>
                                        </Link>
                                    </td>
                                    <td className={'py-4'}>
                                        <Button variant={'danger'} className={'w-75 text-light'} onClick={() => {
                                            setUserRemoveId(user.id)
                                            setRemoveModalShow(true)
                                        }}>delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        }

                </Table>
                {userList.length === 0 && <p className={'w-100 fs-3 text-center text-danger'}>There is no user</p>}
            </div>

            {/*remove modal show*/}
            <Modal show={removeModalShow} onHide={()=> setRemoveModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>do you want to delete user</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> setRemoveModalShow(false)}>
                        Cancle
                    </Button>
                    <Button variant="danger" onClick={()=> {
                        dispatch(remove({id:removeUserId}))
                        setRemoveModalShow(false)
                    }}>
                        delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserList