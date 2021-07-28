import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from "../../store/actions/BannerAction";
import { REMOVE_BANNER_ERRORS } from "../../store/types/BannerType";


const AddBanner = (props) => {
    const dispatch = useDispatch();
    const { bannerErrors,redirect } = useSelector((state)=> state.BannerReducer);
    const [state,setState] = useState({
        title:'',
        subtitle:'',
        btn_text: '',
        link: '',
        alt: '',
        banner_image:'',
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
    const createBanner = (e) =>{
        e.preventDefault();
        const {title,subtitle,btn_text,link,alt,banner_image} = state;
        const formData = new FormData();
        formData.append('title',title);
        formData.append('subtitle',subtitle);
        formData.append('btn_text',btn_text);
        formData.append('link', link);
        formData.append('alt', alt);
        formData.append('banner_image', banner_image);
        dispatch(createAction(formData));
    }

    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/banner/all?page=1');
        }
        if(Object.keys(bannerErrors).length > 0){
            for(const error in bannerErrors){
                toast.error(bannerErrors[error])
            }
            dispatch({type: REMOVE_BANNER_ERRORS});
        }
    },[bannerErrors,redirect]);

    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Create banner - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Banner</h4>
                    <h3><NavLink exact to="/admin/banner/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Banner</NavLink></h3>
                </div>
                <form role="form" onSubmit={createBanner}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Banner Title</label>
                        <div className="col-sm-8">
                           <input type="text" name="title" value={state.title} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Banner Title"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Banner SubTitle</label>
                        <div className="col-sm-8">
                           <input type="text" name="subtitle" value={state.subtitle} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Banner Subtitle"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Link</label>
                        <div className="col-sm-8">
                           <input type="text" name="link" value={state.link} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Button Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Button Tect</label>
                        <div className="col-sm-8">
                           <input type="text" name="btn_text" value={state.btn_text} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Button Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Link</label>
                        <div className="col-sm-8">
                           <input type="text" name="alt" value={state.alt} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Alt Text" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Banner Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="banner_image"  class="form-control"/>
                        </div>
                    </div>
                    {preview?(
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Banner Image Preview</label>
                        <div className="col-sm-8">
                            <img src={preview} width="100" height="100"></img>
                        </div>
                    </div>
                    ):('')}
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
        </div>
    );
}

export default AddBanner;