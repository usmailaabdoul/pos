import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { ActionModal } from '../../components';
import Swal from 'sweetalert2'
import Navbar from '../../components/Navbar';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import './categories.css'

const data = [
    { id: 1, name: 'General', isRetired: false },
    { id: 2, name: 'Office', isRetired: false },
]

const Categories = () => {
    const [isEditCategoryModalVisible, setEditCategoryModalVisible] = useState(false)
    const [isNewCategoryModalVisible, setNewCategoryModalVisible] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])

    useEffect(() => {
        setCategories(data)
        setFilteredCategories(data)
    }, [])


    const handleSearchInput = e => {
        if (!e) {
            setFilteredCategories([...categories])
            return
        }
        let searchString = e.target.value.toLowerCase()
        let tmp = categories.filter(cat => {
            return cat.name.toLowerCase().indexOf(searchString) >= 0
        })
        setFilteredCategories(tmp)
    }

    const editCategory = (cat) => {
        setSelectedCategory(cat);
        setEditCategoryModalVisible(true);
    }

    const deleteCategory = (cat) => {
        let index = data.findIndex((u) => u.id === cat.id);
        if (index >= 0) {
            data.splice(index, 1);
        }

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    `${cat.name} was successfully deleted`,
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row ml-0 my-3 d-flex justify-content-start align-items-center">
                    <div className="w-50 d-flex justify-content-start align-items-center employees-header">
                        <div className="mr-3 ml-3"><span className="h6">Name</span></div>
                        <div className="w-50">
                            <input type="text" onChange={handleSearchInput} placeholder="search" name="search"
                                className={"form-control input"} />
                        </div>
                    </div>
                    <div className="">
                        <button onClick={() => setNewCategoryModalVisible(true)} className="btn btn-primary btn-block mx-3">
                            <AddIcon style={{ position: 'relative', bottom: '2' }} /><span className="h5 ml-3">New Category</span>
                        </button>
                    </div>
                </div>

                <ReactTable
                    showPagination={true}
                    showPageSizeOptions={false}
                    minRows={0}
                    data={filteredCategories}
                    defaultPageSize={10}
                    style={{
                        // height: "45vh" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                    loadingText='Loading Products ...'
                    noDataText='No products found'
                    className="-highlight -striped rt-rows-height ReactTable"
                    columns={[
                        {
                            Header: "",
                            id: "row",
                            maxWidth: 50,
                            filterable: false,
                            Cell: (row) => {
                                return <div>{row.index + 1}</div>;
                            }
                        },
                        {
                            Header: "Name",
                            accessor: "name",
                        },
                        {
                            Header: 'Actions',
                            id: "actions",
                            Cell: cat => {
                                return (
                                    <div>
                                        <span onClick={() => editCategory(cat.original)} className="mr-4 table-icons"><EditIcon style={{ fontSize: 20 }} /></span>
                                        <span onClick={() => deleteCategory(cat.original)} className="table-icons"><DeleteIcon style={{ fontSize: 20 }} /></span>
                                    </div>
                                )
                            }
                        }
                    ]}

                />
                {isEditCategoryModalVisible && (
                    <EditCategory setEditModalVisible={() => setEditCategoryModalVisible(false)} isEditModalVisible={isEditCategoryModalVisible} category={selectedCategory} />
                )}
                {isNewCategoryModalVisible && (
                    <NewCategory setNewCategoryModalVisible={() => setNewCategoryModalVisible(false)} isNewCategoryModalVisible={isNewCategoryModalVisible} />
                )}

            </div>
        </div>
    )
}

const NewCategory = (props) => {
    const { setNewCategoryModalVisible, isNewCategoryModalVisible } = props;
    const [name, setName] = useState('')

    const handleNameInput = (e) => setName(e.target.value)
    const handleCancleClick = () => {
        setName('')
        setNewCategoryModalVisible(false)
    }
    const handleSuccessClick = (e) => {
        // api to update name
        // handle error
        Swal.fire(
            'Created!',
            `category: ${name} created successfully`,
            'success'
        )
        setNewCategoryModalVisible(false)
    }

    return (
        <ActionModal
            isVisible={isNewCategoryModalVisible}
            setIsVisible={() => setNewCategoryModalVisible(false)}
            title="Edit Category">
            <div className="mx-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div><span className="w-25 text h6">Name</span></div>
                    <input name="name" placeholder="name" value={name} onChange={handleNameInput} type="text" className={"w-75 form-control input"} />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
                <button onClick={() => handleCancleClick(false)} className="btn btn-danger mr-2"><span
                    className="h5 px-2">Cancel</span></button>
                <button onClick={() => handleSuccessClick(false)} className="btn btn-success mr-2"><span
                    className="h5 px-2">Save</span></button>
            </div>
        </ActionModal>
    )
}

const EditCategory = (props) => {
    const { setEditModalVisible, isEditModalVisible, category } = props;
    const [name, setName] = useState(category.name)

    const handleNameInput = (e) => setName(e.target.value)
    const handleCancleClick = () => {
        setName('')
        setEditModalVisible(false)
    }
    const handleSuccessClick = (e) => {
        // api to update name
        // handle error
        Swal.fire(
            'Updated!',
            `category: ${name} updated successfully`,
            'success'
        )
        setEditModalVisible(false)
    }

    return (
        <ActionModal
            isVisible={isEditModalVisible}
            setIsVisible={() => setEditModalVisible(false)}
            title="Edit Category">
            <div className="mx-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div><span className="w-25 text h6">Name</span></div>
                    <input name="username" placeholder="name" value={category.name} onChange={handleNameInput} type="text"
                        className={"w-75 form-control input"} />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 mx-5">
                <button onClick={() => handleCancleClick(false)} className="btn btn-danger mr-2"><span
                    className="h5 px-2">Cancel</span></button>
                <button onClick={() => handleSuccessClick(false)} className="btn btn-success mr-2"><span
                    className="h5 px-2">Save</span></button>
            </div>
        </ActionModal>
    )
}

export default Categories