import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button, Form} from 'react-bootstrap';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import DatePicker from "react-datepicker";
import moment from "moment";

function SalaryEmployee() {
    const [salary, setSalary] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(4);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false)

    const getSalary = (page) => {
        mainAxios({
            method: 'get',
            url: '/employee-salary/calculate',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                date: moment(date).format("MM-DD-YYYY")
            }
        }).then((res) => {
            setLoading(false)
            setCurrentPage(page)
            setSalary(res.data.data.data);
            setTotalRecord(res.data.data.totalElement);
        });
    }

    const calculate = () => {
        setLoading(true)
        getSalary(1)
    }

    useEffect(() => {
        getSalary(1)
    }, []);

    return (
        <Aux>
            <div className="staff-salary">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            Əmək haqqı hesablama
                        </div>
                        <ul className="btn-block flex-end list-unstyled m-0">
                            <li>
                                <Form.Group className="m-0">
                                    <Form.Label className="relative m-0">
                                        <DatePicker selected={date}
                                                    dateFormat="dd-MM-yyyy"
                                                    placeholderText="DD-MM-YYYY"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    onChange={(date) => setDate(date)}/>
                                        <Button className="btn-transparent">
                                            <svg width="18" height="18"
                                                 viewBox="0 0 18 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.8"
                                                   clipPath="url(#clip0)">
                                                    <path
                                                        d="M5.34327 8.75391H4.25583C3.97432 8.75391 3.74609 8.99002 3.74609 9.28125C3.74609 9.57248 3.97432 9.80859 4.25583 9.80859H5.34327C5.62478 9.80859 5.853 9.57248 5.853 9.28125C5.853 8.99002 5.62478 8.75391 5.34327 8.75391Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M5.34327 11.0039H4.25583C3.97432 11.0039 3.74609 11.24 3.74609 11.5312C3.74609 11.8225 3.97432 12.0586 4.25583 12.0586H5.34327C5.62478 12.0586 5.853 11.8225 5.853 11.5312C5.853 11.24 5.62478 11.0039 5.34327 11.0039Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M5.34327 13.2539H4.25583C3.97432 13.2539 3.74609 13.49 3.74609 13.7812C3.74609 14.0725 3.97432 14.3086 4.25583 14.3086H5.34327C5.62478 14.3086 5.853 14.0725 5.853 13.7812C5.853 13.49 5.62478 13.2539 5.34327 13.2539Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M9.69092 8.75391H8.60349C8.32198 8.75391 8.09375 8.99002 8.09375 9.28125C8.09375 9.57248 8.32198 9.80859 8.60349 9.80859H9.69092C9.97243 9.80859 10.2007 9.57248 10.2007 9.28125C10.2007 8.99002 9.97243 8.75391 9.69092 8.75391Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M9.69092 11.0039H8.60349C8.32198 11.0039 8.09375 11.24 8.09375 11.5312C8.09375 11.8225 8.32198 12.0586 8.60349 12.0586H9.69092C9.97243 12.0586 10.2007 11.8225 10.2007 11.5312C10.2007 11.24 9.97243 11.0039 9.69092 11.0039Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M9.69092 13.2539H8.60349C8.32198 13.2539 8.09375 13.49 8.09375 13.7812C8.09375 14.0725 8.32198 14.3086 8.60349 14.3086H9.69092C9.97243 14.3086 10.2007 14.0725 10.2007 13.7812C10.2007 13.49 9.97243 13.2539 9.69092 13.2539Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M14.0425 8.75391H12.955C12.6735 8.75391 12.4453 8.99002 12.4453 9.28125C12.4453 9.57248 12.6735 9.80859 12.955 9.80859H14.0425C14.324 9.80859 14.5522 9.57248 14.5522 9.28125C14.5522 8.99002 14.324 8.75391 14.0425 8.75391Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M14.0425 11.0039H12.955C12.6735 11.0039 12.4453 11.24 12.4453 11.5312C12.4453 11.8225 12.6735 12.0586 12.955 12.0586H14.0425C14.324 12.0586 14.5522 11.8225 14.5522 11.5312C14.5522 11.24 14.324 11.0039 14.0425 11.0039Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M14.0425 13.2539H12.955C12.6735 13.2539 12.4453 13.49 12.4453 13.7812C12.4453 14.0725 12.6735 14.3086 12.955 14.3086H14.0425C14.324 14.3086 14.5522 14.0725 14.5522 13.7812C14.5522 13.49 14.324 13.2539 14.0425 13.2539Z"
                                                        fill="#181818"/>
                                                    <path
                                                        d="M16.319 2.28516H15.0956V1.40625C15.0956 1.11502 14.8674 0.878906 14.5859 0.878906C14.3044 0.878906 14.0762 1.11502 14.0762 1.40625V2.28516H9.65845V1.40625C9.65845 1.11502 9.43023 0.878906 9.14872 0.878906C8.86721 0.878906 8.63898 1.11502 8.63898 1.40625V2.28516H4.22127V1.40625C4.22127 1.11502 3.99304 0.878906 3.71153 0.878906C3.43002 0.878906 3.20179 1.11502 3.20179 1.40625V2.28516H1.97843C1.13522 2.28516 0.449219 2.99486 0.449219 3.86719V15.5391C0.449219 16.4114 1.13522 17.1211 1.97843 17.1211H16.319C17.1622 17.1211 17.8482 16.4114 17.8482 15.5391C17.8482 15.1987 17.8482 4.16338 17.8482 3.86719C17.8482 2.99486 17.1622 2.28516 16.319 2.28516ZM1.46869 3.86719C1.46869 3.57641 1.69736 3.33984 1.97843 3.33984H3.20179V4.21875C3.20179 4.50998 3.43002 4.74609 3.71153 4.74609C3.99304 4.74609 4.22127 4.50998 4.22127 4.21875V3.33984H8.63898V4.21875C8.63898 4.50998 8.86721 4.74609 9.14872 4.74609C9.43023 4.74609 9.65845 4.50998 9.65845 4.21875V3.33984H14.0762V4.21875C14.0762 4.50998 14.3044 4.74609 14.5859 4.74609C14.8674 4.74609 15.0956 4.50998 15.0956 4.21875V3.33984H16.319C16.6001 3.33984 16.8287 3.57641 16.8287 3.86719V5.94141H1.46869V3.86719ZM16.319 16.0664H1.97843C1.69736 16.0664 1.46869 15.8298 1.46869 15.5391V6.99609H16.8287V15.5391C16.8287 15.8298 16.6001 16.0664 16.319 16.0664Z"
                                                        fill="#181818"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect width="17.399"
                                                              height="18"
                                                              fill="white"
                                                              transform="translate(0.449219)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Form.Label>
                                </Form.Group>
                            </li>
                            <li>
                                <button  type="button" className="btn-main" onClick={() => calculate()}>
                                    Hesabla
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="block">
                        <Table responsive="sm" hover className={["m-0", loading ? 'active' : ''].join(' ')}>
                            <tbody>

                            </tbody>
                            <thead>
                            <tr>
                                <th>Soyadı, adı, ata adı</th>
                                <th>İşçinin vəzifəsi</th>
                                <th>İş günlərinin sayı</th>
                                <th>İşlədiyi günlərin sayı</th>
                                <th>Yekun əmək haqqı</th>
                                <th>M.D.S.S Müəssə 3%</th>
                                <th>İTS Müəssə</th>
                                <th>İşsizlik Müəssə</th>
                                <th>Gəlir vergisi</th>
                                <th>İşsizlik işçi</th>
                                <th>M.D.S.S işçi</th>
                                <th>İTS işçi</th>
                                <th>Digər</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                salary.length > 0 ?
                                    salary.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.fullName}</td>
                                            <td>{item.vacancyName}</td>
                                            <td>{item.activeDayCount}</td>
                                            <td>{item.employeeActiveDayCount}</td>
                                            <td>{item.netSalary}</td>
                                            <td>{item.positionMDSS}</td>
                                            <td>{item.positionITS}</td>
                                            <td>{item.positionUnemploymentTax}</td>
                                            <td>{item.incomingTax}</td>
                                            <td>{item.employeeUnemploymentTax}</td>
                                            <td>{item.employeeMDSS}</td>
                                            <td>{item.employeeITS}</td>
                                            <td>{item.other}</td>
                                        </tr>
                                    )
                                    : null
                            }
                            </tbody>
                        </Table>
                    </div>
                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                              click={(page) => getSalary(page)}/>
                </Container>
            </div>
        </Aux>

    );
}

export default SalaryEmployee
