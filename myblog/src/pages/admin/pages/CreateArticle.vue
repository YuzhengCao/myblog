<template>
  <div>
    <el-form>
      <el-form-item style="margin-bottom: 40px; width: 60%; float: left;" prop="title" label-width="45px" label="标题:">
        <el-input v-model="title" placeholder="请输入内容"/>
      </el-form-item>

      <el-form-item style="margin-bottom: 40px; float: left; margin: 0 40px" prop="type" label-width="45px" label="标签:">
        <el-select
          v-model="type"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div style="clear:both"></div>
      <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
        <el-input v-model="subtitle" type="textarea" autosize placeholder="请输入内容" />
      </el-form-item>

      <el-form-item prop="content" style="margin-bottom: 30px;">
        <editor v-model="tinymceHtml" :init="editorInit"></editor>
      </el-form-item>

      <el-form-item prop="image_uri" style="margin-bottom: 30px;">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-button @click="submit" type="primary" v-loading.fullscreen.lock="fullscreenLoading">上传文章</el-button>
    </el-form>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import axios from 'axios'
export default {
  name: 'CreateArticle',
  data () {
    return {
      fullscreenLoading: false,
      title: '',
      subtitle: '',
      editorInit: {
        language_url: '/langs/zh_CN.js',//语言包的路径
        language: 'zh_CN',//语言
        skin_url: '/skins/ui/oxide',//skin路径
        height: 300,//编辑器高度
        branding: false,//是否禁用“Powered by TinyMCE”
        menubar: false,//顶部菜单栏显示
        plugins: 'lists image media table wordcount',
        toolbar: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      tinymceHtml: '',
      imageUrl: '',
      type: [],
      options: [{
        value: '杂文随笔',
        label: '杂文随笔'
      }, {
        value: '前端技术',
        label: '前端技术'
      }, {
        value: '后端技术',
        label: '后端技术'
      }]
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submit () {
      this.fullscreenLoading = true
      axios.post('/article/addArticle', {
        title: this.title,
        subtitle: this.subtitle,
        tinymceHtml: this.tinymceHtml,
        type: this.type,
        imageUrl: this.imageUrl
      }).then((res) => {
        this.fullscreenLoading = false
        res = res.data
        if (res.status == '0' && res.result != undefined) {
          this.$message({
            message: '恭喜你，上传成功~',
            type: 'success'
          });
        } else {
          this.$message.error('上传失败！');
        }
      }).catch(function (error) {
        this.$message.error('上传失败！');
      });
    }
  },
  mounted() {
    tinymce.init({})
  },
  components: {
    Editor
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
