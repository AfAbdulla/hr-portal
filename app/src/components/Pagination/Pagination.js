import React from 'react';
import Pagination from "react-bootstrap/Pagination";

function Paginate(props) {
    //const paginationItems = [];
    const amountPages = Math.ceil(props.count / props.recordSize);
    let next = props.currentPage + 1;
    let prev = props.currentPage - 1
    /* for (let i = 2; i < amountPages; i++) {
         if (props.currentPage === i) {
             let prev = props.currentPage - 1;
             let next = props.currentPage + 1;
             if(prev - 1 > 1) {
                 paginationItems.unshift(
                     <Pagination.Ellipsis/>
                 )
             }
             if (prev !== 1) {
                 paginationItems.push(
                     <Pagination.Item active={prev === props.currentPage}  onClick={() => {
                         props.click(prev)
                     }}>
                         {prev}
                     </Pagination.Item>
                 )
             }
             paginationItems.push(
                 <Pagination.Item active={i === props.currentPage}  onClick={() => {
                     props.click(i)
                 }}>
                     {i}
                 </Pagination.Item>
             )
             if (next !== amountPages) {
                 paginationItems.push(
                     <Pagination.Item active={next === props.currentPage}  onClick={() => {
                         props.click(next)
                     }}>
                         {next}
                     </Pagination.Item>
                 )
             }
             if(amountPages > next + 1) {
                 paginationItems.push(
                     <Pagination.Ellipsis/>
                 )
             }
         }
     }*/

    return (
        amountPages > 1 ?
            <div className="pagination-block flex-vertical-center">
                <Pagination>
                    <Pagination.Prev disabled={props.currentPage === 1 ? true : false} onClick={() => {
                        props.click(props.currentPage - 1)
                    }}/>
                    {
                        props.currentPage !== 1 ?
                            <Pagination.Item active={1 === props.currentPage} onClick={() => {
                                props.click(1)
                            }}>
                                1
                            </Pagination.Item>
                            : ''
                    }
                    {
                        prev - 1 > 1 ?
                            <Pagination.Ellipsis/>
                            : ''
                    }
                    {
                        props.currentPage !== 1 && prev !== 1 ?
                            <Pagination.Item active={props.currentPage === prev} onClick={() => {
                                props.click(prev)
                            }}>
                                {prev}
                            </Pagination.Item>
                            : ''
                    }
                    <Pagination.Item active={props.currentPage} onClick={() => {
                        props.click(props.currentPage)
                    }}>
                        {props.currentPage}
                    </Pagination.Item>
                    {
                        props.currentPage !== amountPages && next !== amountPages ?
                            <Pagination.Item active={props.currentPage + 1 === props.currentPage} onClick={() => {
                                props.click(props.currentPage + 1)
                            }}>
                                {props.currentPage + 1}
                            </Pagination.Item>
                            : ''
                    }
                    {
                        next + 1 < amountPages ?
                            <Pagination.Ellipsis/>
                            : ''
                    }
                    {
                        props.currentPage !== amountPages ?
                            <Pagination.Item active={amountPages === props.currentPage} onClick={() => {
                                props.click(amountPages)
                            }}>
                                {amountPages}
                            </Pagination.Item>
                            : ''
                    }
                    <Pagination.Next disabled={props.currentPage === amountPages ? true : false} onClick={() => {
                        props.click(props.currentPage + 1)
                    }}/>
                </Pagination>
            </div>
            : ''
    )
}

export default Paginate
