import React, {useState} from 'react';
import Pagination from "react-bootstrap/Pagination";

function Paginate (props) {
    const paginationItems = [];
    const amountPages = Math.ceil(props.count / 5);
    for(let i=1; i<=amountPages;i++) {
        paginationItems.push(
            <Pagination.Item active = {i == props.currentPage}  >
                {i}
            </Pagination.Item>
        )
    }

    return (
        <div className="pagination-block flex-vertical-center">
            <Pagination>
                <Pagination.Prev onClick={props.click} disabled={props.currentPage == 0 ?  true : false}/>
                {paginationItems}
        {/*        <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{9}</Pagination.Item>
                <Pagination.Item>{10}</Pagination.Item>*/}
                <Pagination.Next disabled={props.currentPage == props.count ?  true : false} />
            </Pagination>
        </div>
    )
}

export default Paginate
