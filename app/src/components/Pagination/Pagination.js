import React from 'react';
import Pagination from "react-bootstrap/Pagination";

function Paginate(props) {
    const paginationItems = [];
    const amountPages = Math.ceil(props.count / props.recordSize);
    for (let i = 1; i <= amountPages; i++) {
        paginationItems.push(
            <Pagination.Item active={i === props.currentPage} key={i} onClick={() => {
                props.click(i)
            }}>
                {i}
            </Pagination.Item>
        )
    }

    return (
        amountPages > 1 ?
            <div className="pagination-block flex-vertical-center">
                <Pagination>
                    <Pagination.Prev disabled={props.currentPage === 1 ? true : false} onClick={() => {props.click(props.currentPage - 1)}}/>
                    {paginationItems}
                    {/*        <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{9}</Pagination.Item>
                <Pagination.Item>{10}</Pagination.Item>*/}
                    <Pagination.Next disabled={props.currentPage === amountPages ? true : false} onClick={() => {props.click(props.currentPage + 1)}}/>
                </Pagination>
            </div>
            : ''
    )
}

export default Paginate
