import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { fetchbrands, fetchcategories, updateAction, fetchProduct } from "../../store/actions/ProductAction";
import { REMOVE_PRODUCT_ERRORS } from "../../store/types/ProductType";
import Loader from "../loader/Loader";


const EditProduct = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { productErrors,redirect,categories,brands,product,status,loading } = useSelector((state)=> state.ProductReducer);
    const [state,setState] = useState({
        name:'',
        category:'',
        brand: '',
        code: '',
        color: '',
        price:'',
        discount:'',
        weight:'',
        video:'',
        image:'',
        description:'',
        fabric:'',
        sleeve:'',
        short_description:'',
        featured:'',
    });
    const [preview, setPreview] = useState('');
    const handleInput = (e) =>{
         setState({
             ...state,
             [e.target.name]: e.target.value
         });
    }
    const handleImage = (e) =>{
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            });
            reader.onloadend = () =>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const handleVideo = (e) =>{
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            });
            reader.onloadend = () =>{
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const handleCheck = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.checked
        });
    }
    const updateProduct = (e) =>{
        e.preventDefault();
        // console.log(state)
        const {name,category,brand,code,color,price,discount,weight,video,image,description,fabric,sleeve,short_description,featured} = state;
        const formData = new FormData();
        formData.append('name',name);
        formData.append('category',category);
        formData.append('brand',brand);
        formData.append('code', code);
        formData.append('color', color);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('weight', weight);
        formData.append('video', video);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('fabric', fabric);
        formData.append('sleeve', sleeve);
        formData.append('short_description', short_description);
        formData.append('featured', featured);
        dispatch(updateAction(formData, id));
    }

    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/product/all?page=1');
        }
        if(Object.keys(productErrors).length > 0){
            for(const error in productErrors){
                toast.error(productErrors[error])
            }
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors,redirect]);
    
    useEffect(()=>{
        if(status){
           setState({
               name: product.product_name,
               category: product.category_id,
               brand: product.brand_id,
               code: product.product_code,
               color: product.product_color,
               price: product.product_price,
               weight: product.product_weight,
               discount: product.product_discount,
               fabric: product.fabric,
               sleeve: product.sleeve,
               description: product.description,
               short_description: product.short_description,
               featured: product.is_featured==='Yes'?true:false
           });
           setPreview(`${process.env.REACT_APP_API_PATH}/images/product_images/small/${product.main_image}`)
        }
        dispatch(fetchProduct(id));
    },[status]);

    useEffect(()=>{
        dispatch(fetchbrands());
        dispatch(fetchcategories());
    },[]);

    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Edit product - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Edit Product</h4>
                    <h3><NavLink exact to="/admin/product/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Product</NavLink></h3>
                </div>
                {!loading?<form role="form" onSubmit={updateProduct}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Product Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="name" value={state.name} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Product Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Product Category</label>
                        <div className="col-sm-8">
                           <select className="form-control" name="category" onChange={handleInput} value={product.category_id}>
                               <option value="">Select Category</option>
                               {
                                   categories.map((category,index)=>(
                                    <>
                                    <option key={index} value={category.id} selected={product.category_id === category.id} >{category.category_name}</option>
                                    {
                                        category.subcategories.map((sub)=>(
                                            <option key={sub.id} value={sub.id} selected={product.category_id === category.id}  >&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;{sub.category_name}</option>
                                        ))
                                    }
                                    </>
                                   ))
                                   
                               }
                           </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Brand</label>
                        <div className="col-sm-8">
                        <select className="form-control" name="brand" onChange={handleInput}>
                               <option value="">Select Brand</option>
                               {
                                   
                                   brands.map((brand,index)=>(
                                      <option key={index} value={brand.id} selected={product.brand_id === brand.id} >{brand.name}</option>
                                   ))
                                   
                               }
                           </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="code" value={state.code} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Product Code" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Color (Seperate with Comma)</label>
                        <div className="col-sm-8">
                           <input type="text" name="color" value={state.color} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Color" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Video</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleVideo} name="video"  class="form-control" accept="video/*"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Price</label>
                        <div className="col-sm-8">
                           <input type="text" name="price" value={state.price} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Price" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Discount</label>
                        <div className="col-sm-8">
                           <input type="text" name="discount" value={state.discount} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Discount" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Weight</label>
                        <div className="col-sm-8">
                           <input type="text" name="weight" value={state.weight} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Weight" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="image"  class="form-control" accept="image/*"/>
                        </div>
                    </div>
                    {preview?(
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Product Image Preview</label>
                        <div className="col-sm-8">
                            <img src={preview} width="100" height="100"></img>
                        </div>
                    </div>
                    ):('')}
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Description</label>
                        <div className="col-sm-8">
                            <textarea onChange={handleInput} value={state.description} name="description" rows="4"  class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Fabric</label>
                        <div className="col-sm-8">
                            <select className="form-control" name="fabric" onChange={handleInput}>
                                <option value="">Select Fabric</option>
                                <option value="Cotton" selected={product.fabric === 'Cotton'} >Cotton</option>
                                <option value="Polyester" selected={product.fabric === 'Polyester'}>Polyester</option>
                                <option value="Wool" selected={product.fabric === 'Wool'}>Wool</option>
                            </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Sleeve</label>
                        <div className="col-sm-8">
                            <select className="form-control" name="sleeve" onChange={handleInput}>
                                <option value="">Select Sleeve</option>
                                <option value="Full Sleeve" selected={product.sleeve === 'Full Sleeve'}>Full Sleeve</option>
                                <option value="Half Sleeve" selected={product.sleeve === 'Half Sleeve'}>Half Sleeve</option>
                                <option value="Sleeveless" selected={product.sleeve === 'Sleeveless'}>Sleeveless</option>
                            </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Short Description</label>
                        <div className="col-sm-8">
                            <textarea onChange={handleInput} value={state.short_description} name="short_description" rows="4"  class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Featured</label>
                        <div className="col-sm-8">
                            <input type="checkbox" onChange={handleCheck} name="featured" checked={product.is_featured==='Yes'}/>
                        </div>
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form>:<Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default EditProduct;