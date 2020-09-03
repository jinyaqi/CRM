$(function () {
    init();

    let $plan = $.Callbacks(); //用来发布订阅
    $plan.add((_, baseInfo) => {
        //渲染用户信息和实现退出登录
        // console.log("渲染用户信息和实现退出登录",baseInfo);
        $(".baseBox>span").html(`你好,${baseInfo.name || ''}`)

        $(".baseBox>a").click(async function(){
            let result =await axios.get("/user/signout")
            if(result.code==0){
                //退出登录成功
                window.location.href="login.html"
                return;
            }
            //退出登录失败
            alert("网络不给力，请稍后再试")
        })
    })
    $plan.add((power) => {
        console.log("渲染菜单", power);
    })
    async function init() {
        let result = await axios.get("/user/login");
        // console.log(result);
        if (result.code != 0) {
            alert("你还没有登录，请先登录")
            window.location.href = "login.html";
            return;
        }
        //登录成功
        let [power, baseInfo] = await axios.all([
            axios.get("/user/power"),   //获取用户权限
            axios.get("/user/info")    // 获取用户详细信息
        ])
        // console.log(power);
        // console.log(baseInfo);

        baseInfo.code === 0 ? baseInfo = baseInfo.data : null

        //发布订阅
        $plan.fire(power, baseInfo)
    }
})