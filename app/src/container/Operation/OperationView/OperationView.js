import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab} from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import "react-datepicker/dist/react-datepicker.css";

function OperationView() {
    const {params: {id}} = useRouteMatch('/operationView/:id');

    const [tab, setTab] = useState('');
    const [operationName, setOperationName] = useState('');

    const [docWorkMode, setDocWorkMode] = useState('');
    const [docSalary, setDocSalary] = useState('');
    const [docAdditionalSalary, setDocAdditionalSalary] = useState('');
    const [docOwnAdditionalSalary, setDocOwnAdditionalSalary] = useState('');
    const [docMainOfOrder, setDocMainOfOrder] = useState('');
    const [noteArr, setNoteArr] = useState([]);
    const [testPeriod, setTestPeriod] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [changeDate, setChangeDate] = useState('');
    const [changePeriod, setChangePeriod] = useState('');
    const [financialHelp, setFinancialHelp] = useState('');
    const [achievement, setAchievement] = useState('');

    /*employee*/
    const [vacancyName, setVacancyName] = useState('');
    const [department, setDepartment] = useState('')
    const [subDepartment, setSubDepartment] = useState('');
    const [additionalSalary, setAdditionalSalary] = useState('');
    const [ownAdditionalSalary, setOwnAdditionalSalary] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [salary, setSalary] = useState('');
    const [fullName, setFullName] = useState('');
    const [firedDate, setFiredDate] = useState('');
    const [firedReason, setFiredReason] = useState('');
    const [compensation, setCompensation] = useState('');


    /*position*/
    const [positionDepartment, setPositionDepartment] = useState('')
    const [positionSubDepartment, setPositionSubDepartment] = useState('');
    const [positionVacancyName, setPositionVacancyName] = useState('');
    const [positionSalary, setPositionSalary] = useState('');
    const [positionAdditionalSalary, setPositionAdditionalSalary] = useState('');
    //const [positionOwnAdditionalSalary, setPositionOwnAdditionalSalary] = useState('');
    const [positionVacancyCount, setPositionVacancyCount] = useState('');
    const [positionWorkMode, setPositionWorkMode] = useState('');
    const [positionVacancyCategory, setPositionVacancyCategory] = useState('');
    const [positionWorkPlace, setPositionWorkPlace] = useState('');


    const getDocument = () => {
        mainAxios({
            method: 'get',
            url: '/document/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            let data = res.data.data
            setTab(data.documentId);
            setOperationName(data.documentType);
            setDocSalary(data.newSalary);
            setDocWorkMode(data.newWorkMode);
            setDocMainOfOrder(data.mainOfOrder);
            setDocOwnAdditionalSalary(data.newOwnAdditionalSalary);
            setDocAdditionalSalary(data.newAdditionalSalary);
            setFiredDate(data.dismissalDate);
            setFiredReason(data.dismissalReason);
            setNoteArr(data.notes);
            setJoinDate(data.joinDate);
            setTestPeriod(data.testPeriod);
            setChangeDate(data.changeDate);
            setChangePeriod(data.changePeriod);
            setFinancialHelp(data.financialHelp);
            setAchievement(data.achievement);
            if (data.positionId !== null) getPosition(data.positionId)
            if (data.employeeId !== null) getEmployee(data.employeeId)
        });
    }

    const getExportDocument = () => {
        mainAxios({
            method: 'get',
            url: 'document/export/' + id,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${operationName}.pdf`);
            document.body.appendChild(link);
            link.click();
        })
    }

    const getEmployee = (id) => {
        mainAxios({
            method: 'get',
            url: 'document/employee/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data
            setDepartment(data.departmentName);
            setSubDepartment(data.subDepartmentName);
            setVacancyName(data.vacancyName);
            setSalary(data.salary)
            setOwnAdditionalSalary(data.ownAdditionalSalary);
            setAdditionalSalary(data.additionalSalary);
            setWorkMode(data.workMode);
            setFullName(data.fullName)
        });
    }

    const getPosition = (id) => {
        mainAxios({
            method: 'get',
            url: '/document/position/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data
            setPositionDepartment(data.departmentName);
            setPositionSubDepartment(data.subDepartmentName);
            setPositionSalary(data.salary);
            setPositionVacancyName(data.vacancyName);
            setPositionVacancyCount(data.vacancyCount);
            setPositionVacancyCategory(data.vacancyCategory);
            setPositionWorkMode(data.workMode);
            setPositionWorkPlace(data.workPlace);
            setPositionAdditionalSalary(data.additionalSalary)
        });
    }

    useEffect(() => {
        getDocument();
    }, []);

    return (
        <Aux>
            <div className="operation">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/operationSchedule" className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            Kadr əməliyyatı
                        </div>
                        <div className="export">
                            <Button className="btn-transparent" onClick={() => getExportDocument()}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.98786 9.79688H4.5C4.31316 9.79688 4.13396 9.87127 4.002 10.0036C3.87005 10.1359 3.79627 10.3154 3.79688 10.5023L3.80724 15.8434C3.80724 16.2317 4.12205 16.5465 4.51036 16.5465C4.89868 16.5465 5.21349 16.2317 5.21349 15.8434V14.2217C5.50097 14.2202 5.8081 14.219 5.98786 14.219C7.2233 14.219 8.22844 13.2271 8.22844 12.0079C8.22844 10.7888 7.2233 9.79688 5.98786 9.79688ZM5.98786 12.8127C5.8065 12.8127 5.49825 12.814 5.20964 12.8155C5.20814 12.5161 5.20683 12.1938 5.20683 12.0079C5.20683 11.8489 5.20604 11.516 5.20519 11.2031H5.98782C6.44007 11.2031 6.82214 11.5717 6.82214 12.0079C6.82214 12.4442 6.44011 12.8127 5.98786 12.8127Z"
                                        fill="#040647"/>
                                    <path
                                        d="M11.9686 9.79688H10.5C10.3133 9.79688 10.1342 9.87112 10.0023 10.0033C9.87042 10.1354 9.7965 10.3146 9.79688 10.5013C9.79688 10.5014 9.80733 15.6691 9.80738 15.6878C9.80808 15.8744 9.8828 16.053 10.0152 16.1843C10.1469 16.3151 10.325 16.3884 10.5105 16.3884H10.5132C10.5576 16.3882 11.6051 16.3843 12.0239 16.377C13.6126 16.3492 14.7658 14.9679 14.7658 13.0927C14.7657 11.1214 13.6417 9.79688 11.9686 9.79688ZM11.9993 14.9709C11.8172 14.9741 11.5039 14.9767 11.2113 14.9786C11.2093 14.3678 11.2055 11.8378 11.2044 11.2031H11.9686C13.2592 11.2031 13.3595 12.6494 13.3595 13.0927C13.3595 14.0158 12.9389 14.9545 11.9993 14.9709Z"
                                        fill="#040647"/>
                                    <path
                                        d="M19.3998 11.1484C19.7881 11.1484 20.103 10.8336 20.103 10.4453C20.103 10.057 19.7881 9.74219 19.3998 9.74219H17.25C16.8617 9.74219 16.5469 10.057 16.5469 10.4453V15.7496C16.5469 16.1379 16.8617 16.4527 17.25 16.4527C17.6383 16.4527 17.9531 16.1379 17.9531 15.7496V13.7504H19.2291C19.6174 13.7504 19.9322 13.4356 19.9322 13.0473C19.9322 12.6589 19.6174 12.3441 19.2291 12.3441H17.9531V11.1484H19.3998Z"
                                        fill="#040647"/>
                                    <path
                                        d="M21.4688 6.79688H20.9531V6.5963C20.9531 5.69245 20.6107 4.83347 19.9888 4.1775L17.0683 1.09683C16.4074 0.399797 15.4775 0 14.517 0H5.15625C3.99314 0 3.04688 0.946266 3.04688 2.10938V6.79688H2.53125C1.36814 6.79688 0.421875 7.74314 0.421875 8.90625V17.3438C0.421875 18.5069 1.36814 19.4531 2.53125 19.4531H3.04688V21.8906C3.04688 23.0537 3.99314 24 5.15625 24H18.8438C20.0069 24 20.9531 23.0537 20.9531 21.8906V19.4531H21.4688C22.6319 19.4531 23.5781 18.5069 23.5781 17.3438V8.90625C23.5781 7.74314 22.6319 6.79688 21.4688 6.79688ZM4.45312 2.10938C4.45312 1.72167 4.76855 1.40625 5.15625 1.40625H14.517C15.0933 1.40625 15.6512 1.64611 16.0477 2.06437L18.9683 5.14505C19.3414 5.53861 19.5469 6.054 19.5469 6.5963V6.79688H4.45312V2.10938ZM19.5469 21.8906C19.5469 22.2783 19.2315 22.5938 18.8438 22.5938H5.15625C4.76855 22.5938 4.45312 22.2783 4.45312 21.8906V19.4531H19.5469V21.8906ZM22.1719 17.3438C22.1719 17.7315 21.8565 18.0469 21.4688 18.0469H2.53125C2.14355 18.0469 1.82812 17.7315 1.82812 17.3438V8.90625C1.82812 8.51855 2.14355 8.20312 2.53125 8.20312H21.4688C21.8565 8.20312 22.1719 8.51855 22.1719 8.90625V17.3438Z"
                                        fill="#040647"/>
                                </svg>
                                Export to PDF
                            </Button>
                        </div>
                    </div>
                    <div className="block">
                        <div className="operation-tab">
                            <Row>
                                <Col xs={12}>
                                    <Form.Group>
                                        <span className="input-title">Əmrin adı</span>
                                        <Form.Label>
                                            <Form.Control placeholder=" Əmrin adı "
                                                          value={operationName || ''} disabled={true}/>
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Tabs activeKey={tab}>
                                <Tab eventKey="1" title="" disabled={tab !== "1"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmrin əsası</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat cədvəli dəyişiklik edilən struktur bölmə: </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="Ştat cədvəli dəyişiklik edilən struktur bölmə adı daxil edin"
                                                        value={positionDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Tabe struktur bölmənin adı </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                  value={positionSubDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat vahidinin adı (vəzifə) </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Ştat vahidinin adı (vəzifə)"
                                                                  value={positionVacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat vahidi (say) </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Ştat vahidi (say)  "
                                                                  value={positionVacancyCount || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmək haqqı AZN(vergilər və digər ödənişlər daxil olmaqla)</span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="Əmək haqqı AZN(vergilər və digər ödənişlər daxil olmaqla)"
                                                        value={positionSalary || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İş rejimi</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İş rejimi"
                                                                  value={positionWorkMode || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">Təsis edilən vəzifənin kateqoriyası</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Təsis edilən vəzifənin kateqoriyası"
                                                                  value={positionVacancyCategory || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İş yerinin ünvanı</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İş yerinin ünvanı"
                                                                  value={positionWorkPlace || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="2" title="" disabled={tab !== "2"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmrin əsası</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat cədvəli dəyişiklik edilən struktur bölmə: </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="Ştat cədvəli dəyişiklik edilən struktur bölmə adı daxil edin"
                                                        value={positionDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Tabe struktur bölmənin adı </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                  value={positionSubDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat vahidinin adı (vəzifə) </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Ştat vahidinin adı (vəzifə)"
                                                                  value={positionVacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat vahidi (say) </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Ştat vahidi (say)  "
                                                                  value={positionVacancyCount || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmək haqqı AZN(vergilər və digər ödənişlər daxil olmaqla)</span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="Əmək haqqı AZN(vergilər və digər ödənişlər daxil olmaqla)"
                                                        value={positionSalary || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İş rejimi</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İş rejimi"
                                                                  value={positionWorkMode || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İş yerinin ünvanı</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İş yerinin ünvanı"
                                                                  value={positionWorkPlace || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="7" title="" disabled={tab !== "7"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmrin əsası</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşə qəbul olduğu struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşə qəbul olduğu struktur bölmə daxil edin"
                                                        value={positionDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşə qəbul olduğu alt struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                  value={positionSubDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşə qəbul olduğu vəzifə </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşə qəbul olduğu vəzifə"
                                                                  value={positionVacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşə qəbul tarixi *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşə qəbul tarixi"
                                                                  value={joinDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Sınaq müddəti </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Sınaq müddəti"
                                                                  value={testPeriod || ''} disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                  value={positionSalary || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                  value={positionAdditionalSalary || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Digər fərdi əlavə </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Digər fərdi əlavə"
                                                                  value={docOwnAdditionalSalary || ''} disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="8" title="" disabled={tab !== "8"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əmrin əsası</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi struktur bölmənin adı</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Struktur bölmənin adı daxil edin"
                                                                  value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmənin adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                  value={subDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşçinin vəzifəsi *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşdən azad olma tarixi *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                  value={firedDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>

                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşdən azad olma səbəbi *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşdən azad olma səbəbini daxil edin"
                                                                  value={firedReason || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İstifadə edilməmiş məzuniyyət gününə görə kompensasiya *</span>
                                                <Form.Label>
                                                    <Form.Control
                                                        value={compensation  || ''}
                                                        disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="addition-content">
                                        <Row>
                                            {
                                                noteArr.map((item, index) =>
                                                    <Col xs={12} key={index}>
                                                        <Form.Group>
                                                            <span className="input-title">Qeyd{index + 1}</span>
                                                            <Form.Label>
                                                                <Form.Control as="textarea"
                                                                              value={item}
                                                                              disabled={true}
                                                                />
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                )
                                            }
                                        </Row>
                                    </div>

                                </Tab>

                                <Tab eventKey="9" title="" disabled={tab !== "9"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Struktur bölmənin adı daxil edin"
                                                                  value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik tarixi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={changeDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionDepartment || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi vəzifə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi vəzifə"
                                                                  value={positionVacancyName || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div>
                                        <div className="block-title">
                                            Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={salary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={additionalSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={ownAdditionalSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <div className="block-title">
                                            Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={docSalary || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={docAdditionalSalary || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={docOwnAdditionalSalary || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>

                                <Tab eventKey="10" title="" disabled={tab !== "10"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik tarixi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={changeDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div>
                                        <div className="block-title">
                                            Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={salary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={additionalSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={ownAdditionalSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <div className="block-title">
                                            Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={docSalary}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={docAdditionalSalary}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={docOwnAdditionalSalary}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>

                                <Tab eventKey="11" title="" disabled={tab !== "11"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik tarixi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={changeDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div>
                                        <div className="block-title">
                                            Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={salary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={additionalSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <div className="block-title">
                                            Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={docSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      disabled={true}
                                                                      value={docAdditionalSalary || ''}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>

                                <Tab eventKey="12" title="" disabled={tab !== "12"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin işlədiyi alt struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={subDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                            <span
                                                                className="input-title">İşçinin faktiki iş rejimi *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşçinin faktiki iş rejimi"
                                                                  value={workMode || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                            <span
                                                                className="input-title">İşçinin keçirildiyi iş rejimi *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşçinin faktiki iş rejimi"
                                                                  value={docWorkMode || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title"> Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" Faktiki əmək haqqı"
                                                                  value={salary || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik edilən əmək haqqı Azn (vergilər və digər ödənişlər daxil olmaqla</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Dəyişiklik edilən əmək haqqı"
                                                                  value={docSalary || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="13" title="" disabled={tab !== "13"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik tarixi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={changeDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionDepartment || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi alt struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionSubDepartment}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi iş yeri</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi iş yeri"
                                                                  value={positionWorkPlace || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div>
                                        <div className="block-title">
                                            Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={salary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={additionalSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={ownAdditionalSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <div className="block-title">
                                            Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={positionSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={positionAdditionalSalary || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={docOwnAdditionalSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>

                                <Tab eventKey="14" title="" disabled={tab !== "14"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Struktur bölmənin adı daxil edin"
                                                                  value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik tarixi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={changeDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi müddət</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi müddət"
                                                                  value={changePeriod || ''} disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionDepartment || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi alt struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionSubDepartment || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Keçirildiyi iş yeri</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi iş yeri"
                                                                  value={positionWorkPlace || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div>
                                        <div className="block-title">
                                            Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={salary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={additionalSalary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={ownAdditionalSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <div className="block-title">
                                            Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                        </div>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                      value={positionSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                      value={positionAdditionalSalary || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group>
                                                    <span className="input-title">Digər fərdi əlavə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                      value={docOwnAdditionalSalary || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </div>
                                </Tab>

                                <Tab eventKey="16" title="" disabled={tab !== "16"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi Vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Dəyişiklik tarixi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={changeDate || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əvəzetmə müddəti</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əvəzetmə müddəti"
                                                                  value={changePeriod || ''} disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əvəz olunan vəzifə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi vəzifə"
                                                                  value={positionVacancyName || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əvəz olunan vəzifənin aid olduğu struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionDepartment || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əvəz olunan vəzifənin aid olduğu alt struktur bölmə</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionSubDepartment || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əvəz edən işçinin əmək haqqı</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={salary || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əvəz edən vəzifənin  əmək haqqı</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                  value={positionSalary || ''}
                                                                  disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="33" title="" disabled={tab !== "33"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əsaslandırma</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin işlədiyi alt struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={subDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Maddi yardımın məbləği (vergilər və digər ödənişər xaric olmaqla) </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Maddi yardımın məbləği "
                                                                  value={financialHelp || ''}
                                                                  disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="34" title="" disabled={tab !== "34"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əsaslandırma</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">Mükafatlandırılan işçinin soyadı, adı, atasının adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={subDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Mükafatın məbləği Azn (vergilər və digər ödənişlər daxil olmaqla və ya xaric olmaqla):  </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Mükafatın məbləği  məbləği "
                                                                  value={achievement || ''}
                                                                  disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="35" title="" disabled={tab !== "35"}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Əsaslandırma</span>
                                                <Form.Label>
                                                    <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                  value={docMainOfOrder || ''} disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                <Form.Label>
                                                    <Form.Control placeholder=" İşçinin soyadı, adı, ata adı "
                                                                  value={fullName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={department || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                <Form.Label>
                                                    <Form.Control
                                                        placeholder="İşlədiyi struktur bölmə"
                                                        value={subDepartment || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">İşlədiyi vəzifəsi </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                  value={vacancyName || ''} disabled={true}/>
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span className="input-title">Fərdi əlavənin məbləği Azn:  </span>
                                                <Form.Label>
                                                    <Form.Control placeholder="300 AZN"
                                                                  value={docOwnAdditionalSalary || ''} disabled={true}
                                                    />
                                                </Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </Container>
            </div>
        </Aux>

    );
}

export default OperationView
