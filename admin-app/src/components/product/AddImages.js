import { NavLink, useParams } from "react-router-dom";
import { addProductImages, allImages, deleteImageAction, imagestatusAction } from "../../store/actions/ProductAction";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_MESSAGE } from "../../store/types/ProductType";
import Loader from "../loader/Loader";
import $ from 'jquery';

const AddImages = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { productErrors, images, loading, message, image_status, imageId } = useSelector((state)=>state.ProductReducer);
    const [state, setState] = useState({
        images: [],
    });
    const handleInput = (e) =>{
        setState({
            images: e.target.files
        });
    }
    const addProductImage = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        if (state.images) {
            for (const file of state.images) {
                formData.append("images[]", file);
            }
        }
        dispatch(addProductImages(formData,id));
        setState({
            images: []
        });
    }
    const productImageStatus = () =>{
        $(document).on('click', '.updateImageStatus', function(){
            const image_id = $(this).attr('data-image');
            const status = $(this).children("i").attr("status");
            dispatch(imagestatusAction({image_id,status}));
         })
    }
    const deleteProduct = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteImageAction(id));
            }
        })
    }
    useEffect(()=>{
        if(Object.keys(productErrors).length > 0){
            for(const error in productErrors){
                toast.error(productErrors[error])
            }
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors]);

    useEffect(()=>{
        if(message){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: message,
              toast: true,
              showConfirmButton: false,
              timer: 2000
            })
          dispatch({type: REMOVE_PRODUCT_MESSAGE});
          dispatch(allImages(id));
        }
    },[message]);

      // Category Status Code
    useEffect(()=>{
        if(image_status == 0){
        $('#image-'+imageId).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${image_status}></i>`);
        }else{
        $('#image-'+imageId).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${image_status}></i>`);
        }
    },[image_status,imageId]);

    useEffect(()=>{
        dispatch(allImages(id));
    },[]);
    return (
        <>
            <div class="content-wrapper">
                <Helmet>
                    <title>Add Product Images - ecom website</title>
                    <meta name="description" content="User add Here" />
                </Helmet>
                <Toaster position="top-right" reverseOrder={false}/>
                <section class="content">
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div class="card-header">
                            <h4 className="float-left">Add/Edit Product Images</h4>
                            <h3><NavLink exact to="/admin/product/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Product</NavLink></h3>
                        </div>
                        <form role="form" onSubmit={addProductImage}>
                            <div class="card-body">
                            <div class="form-group row">
                                <label for="exampleInputName" className="col-sm-2  col-form-label">Product Images</label>
                                <div className="col-sm-8">
                                <input type="file" multiple name="images" onChange={handleInput} class="form-control"/>
                                </div> 
                            </div>
                            <div class="form-group col-6 offset-sm-2">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                        <div class="col-12">
                            <div class="card">
                            <div class="card-body">
                                <table id="example2" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>SL.</th>
                                    <th>Product Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                !loading?
                                images.length > 0 ?
                                images.map((image, index)=>(
                                    <tr key={image.id}>
                                    <td>{ index+1}</td>
                                    <td><img width="100" height="100" src={`${process.env.REACT_APP_API_PATH}/images/product_images/small/${image.image}`}/></td>
                                    <td>
                                        {
                                            (image.status === 1) ? 
                                            <a class="updateImageStatus" data-image={image.id} id={`image-${image.id}`} onClick={productImageStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={image.status} aria-hidden="true"></i></a>
                                            :<a class="updateImageStatus" data-image={image.id} id={`image-${image.id}`} onClick={productImageStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={image.status} aria-hidden="true"></i> </a> 
                                        }
                                    </td>
                                    <td>
                                        <button title="Delete" onClick={() => deleteProduct(image.id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                                    </td>
                                    </tr>
                                    ))
                                    :'No Images found'
                                :(<Loader/>)
                                }
                                </tbody>
                                </table>
                                
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>

                </div>
        </>
    );
}

export default AddImages;