import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {editUser, IuserData} from "../../redux/reducers/dataReducer/dataReducer";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const EditUser = () => {

    const navigate = useNavigate()
    const urlParam = useParams()

    const dispatch = useDispatch()
    const userList: IuserData[] = useSelector((state: any) => state.data.userList)

    const [nameInputVal , setNameInputVal] = useState<string>('')
    const [emailInputVal , setEmailInputVal] = useState<string>('')

    const [nameInputBlur , setNameInputBlur] = useState<boolean>(false)
    const [emailInputBlur , setEmailInputBlur] = useState<boolean>(false)

    const [errNameInput , setErrNameInput] = useState<boolean>(false)
    const [errEmailInput , setErrEmailInput] = useState<string | null>(null)

    useEffect(()=>{
        setTimeout(()=> {
            // @ts-ignore
            const user = userList.find(user => user.id == urlParam.id)
            user && setNameInputVal(user.name)
            user && setEmailInputVal(user.email)
        },5)

    },[urlParam.id])

    //name error handling
    useEffect(()=>{
        nameInputVal.length === 0 ?
            setErrNameInput(true):
            setErrNameInput(false)
    },[nameInputVal])

    //email error handling
    useEffect(()=>{
        emailInputVal.length === 0 ?
            setErrEmailInput('Is Required'):
            emailRegex.test(emailInputVal) ?
                setErrEmailInput(null):
                setErrEmailInput('Is should be valid email')

    },[emailInputVal])

    const handleEdit = () => {
        if(!errEmailInput && !errNameInput){
            const emailCheck = userList.findIndex((user:IuserData) => user.email === emailInputVal)

            if(emailCheck < 0) {
                dispatch(editUser({id : urlParam.id , name : nameInputVal , email : emailInputVal}))
                navigate('/')
            }else {
                setErrEmailInput('we have a user with this email')
            }
        }
    }

    return(
        <div className={'px-0 pt-3'}>
            <div className={'px-3 d-flex justify-content-between align-items-center border-bottom pb-3'}>
                <p className={'m-0 fs-3'}>Form</p>
            </div>
            <div className={'px-4 py-3 d-flex flex-column gap-3'}>
                <Form.Group className="w-full d-flex justify-content-end" controlId="formBasicPassword">
                    <Form.Label className={'mx-auto'}>Name</Form.Label>
                    <div  className={'w-50'}>
                        <Form.Control type="text"
                                      onBlur={()=> setNameInputBlur(true)}
                                      value={nameInputVal}
                                      onChange={(e)=> setNameInputVal(e.target.value)}/>
                        <Form.Control.Feedback type={"invalid"} className={`${errNameInput && nameInputBlur ? 'd-inline-block' : 'd-none'}`}>
                            is Required
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>
                <Form.Group className="w-full d-flex justify-content-end" controlId="formBasicPassword">
                    <Form.Label className={'mx-auto'}>Email</Form.Label>
                    <div  className={'w-50'}>
                        <Form.Control type="email"
                                      onBlur={() => setEmailInputBlur(true)}
                                      value={emailInputVal}
                                      onChange={(e)=> setEmailInputVal(e.target.value)}/>
                        <Form.Control.Feedback type={"invalid"} className={`${errEmailInput && emailInputBlur ? 'd-inline-block' : 'd-none'}`}>
                            {errEmailInput}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <div className={'w-full d-flex justify-content-end gap-2'}>
                    <Link to={'/'}>
                        <Button variant={'outline-danger'} className={'px-4'}>Cancel</Button>
                    </Link>
                    <Button variant={'success'} className={'px-4'}
                            disabled={(Boolean(errEmailInput || errNameInput))}
                            onClick={handleEdit}
                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default EditUser