import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {add, IuserData} from "../../redux/reducers/dataReducer/dataReducer";
import {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


const AddUser = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userList: IuserData[] = useSelector((state: any) => state.data.userList)

    const [nameInputVal , setNameInputVal] = useState<string>('')
    const [emailInputVal , setEmailInputVal] = useState<string>('')
    const [userNameInputVal , setUserNameInputVal] = useState<string>('')
    const [cityInputVal , setCityInputVal] = useState<string>('')

    const [nameInputBlur , setNameInputBlur] = useState<boolean>(false)
    const [emailInputBlur , setEmailInputBlur] = useState<boolean>(false)
    const [userNameInputBlur , setUserNameInputBlur] = useState<boolean>(false)
    const [cityInputBlur , setCityInputBlur] = useState<boolean>(false)

    const [errNameInput , setErrNameInput] = useState<boolean>(false)
    const [errEmailInput , setErrEmailInput] = useState<string | null>(null)
    const [errUserNameInput , setErrUserNameInput] = useState<string | null>(null)
    const [errCityInput , setErrCityInput] = useState<boolean>(false)

    //name error handling
    useEffect(()=>{
        nameInputVal.length === 0 ?
            setErrNameInput(true):
            setErrNameInput(false)
    },[nameInputVal])

    //city error handling
    useEffect(()=>{
        cityInputVal.length === 0 ?
            setErrCityInput(true):
            setErrCityInput(false)
    },[cityInputVal])

    //username error handling
    useEffect(()=>{
        userNameInputVal.length === 0 ?
            setErrUserNameInput('Is Required'):
            setErrUserNameInput(null)
    },[userNameInputVal])

    //email error handling
    useEffect(()=>{
        emailInputVal.length === 0 ?
            setErrEmailInput('Is Required'):
            emailRegex.test(emailInputVal) ?
                setErrEmailInput(null):
                setErrEmailInput('Is should be valid email')

    },[emailInputVal])

    const handleAdd = () => {
        if(!errEmailInput && !errNameInput && !errUserNameInput && !errCityInput){
            const userCheck = userList.findIndex((user:IuserData) => user.userName === userNameInputVal)
            const emailCheck = userList.findIndex((user:IuserData) => user.email === emailInputVal)
            if(userCheck < 0 && emailCheck < 0){
                dispatch(add({
                    id:userList.length === 0 ? 1 :
                        userList[userList.length-1].id + 1,
                    name:nameInputVal,
                    email:emailInputVal,
                    city:cityInputVal,
                    userName:userNameInputVal}))
                navigate('/')
            }else {
                userCheck >= 0 && setErrUserNameInput('we have a user with this username')
                emailCheck >= 0 && setErrEmailInput('we have a user with this email')
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

                <Form.Group className="w-full d-flex justify-content-end" controlId="formBasicPassword">
                    <Form.Label className={'mx-auto'}>Username</Form.Label>
                    <div  className={'w-50'}>
                        <Form.Control type="text"
                                      onBlur={()=> setUserNameInputBlur(true)}
                                      value={userNameInputVal}
                                      onChange={(e)=> setUserNameInputVal(e.target.value)}/>
                        <Form.Control.Feedback type={"invalid"} className={`${errUserNameInput && userNameInputBlur ? 'd-inline-block' : 'd-none'}`}>
                            {errUserNameInput}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="w-full d-flex justify-content-end" controlId="formBasicPassword">
                    <Form.Label className={'mx-auto'}>City</Form.Label>
                    <div  className={'w-50'}>
                        <Form.Control type="text"
                                      onBlur={()=> setCityInputBlur(true)}
                                      value={cityInputVal}
                                      onChange={(e)=> setCityInputVal(e.target.value)}/>
                        <Form.Control.Feedback type={"invalid"} className={`${errCityInput && cityInputBlur ? 'd-inline-block' : 'd-none'}`}>
                            is Required
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <div className={'w-full d-flex justify-content-end gap-2'}>
                    <Link to={'/'}>
                        <Button variant={'outline-danger'} className={'px-4'}>Cancel</Button>
                    </Link>
                    <Button variant={'success'} className={'px-4'}
                            disabled={(Boolean(errEmailInput || errNameInput || errUserNameInput || errCityInput))}
                            onClick={handleAdd}
                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default AddUser