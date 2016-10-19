window.onload = function(){
	//循环遍历整个表单，加载值
	for (var i = 1; i<6;i++) {
		loadStorage(i,i);
	}
	//控制最后失败的面板是否出现
	$(".weui_btn_dialog").click(function(){
		$(".weui_dialog_alert").css("display","none");
	})

	//循环遍历表单，储存值
	timer = setInterval(function(){
		for (var i = 1; i<6;i++) {
			saveStorage(i,i);
		}
	},1000);
	//点击按钮，下面出现各组的介绍
	hint();
	//失去焦点时，会验证输入框内的内容
	$("input").blur(function(e){
		judge_name(e);
		judge_str_number(e);
		judge_phone_number(e);
	})



	$("#submit").click(function(){
		get_width();
	var url = 'submit/re.php';
	var data = {
		name: $("#1").val(),  //传入姓名
		sex: $(".sex input:checked").val(), //传入性别
		major: $("#2").val(), //传入年级
		student_id: $("#3").val(), //传入学号
		phone: $("#4").val(), //传入电话
		intention: $(".select_group input:checked").val(), //传入组别
		comment: $("#5").val() //传入说明
	}
	if(data.name&&data.sex&&data.major&&data.student_id&&data.phone&&data.intention&&data.comment){
		$("#submit").addClass("disabled");
		$.ajax({
			type : "POST",
			//async : false,
			url : 'submit/re.php',
                        dataType: 'json',
			data : data,
			timeout : 6000,
			success:function(result){
                                if (result.errcode == 200){
					$("#submit").attr('disabled',"true");
					$(".prompt").css("display","none");
					$(".wrap").css("display","none");
					$(".weui_msg").css("display","block");
					clearInterval(timer);
					clearStorage();
				} else {
                                        $("#error_prompt").text("出现了一些异常错误，再试试吧");
					$(".weui_dialog_alert").css("display","block");
					$("#submit").removeClass("disabled");
				}
			},
			error: function(jqXHR) {
                                $("#error_prompt").text("网络好像不通呢，请再试一次");
				$(".weui_dialog_alert").css("display","block");
				$("#submit").removeClass("disabled");
   			}
		})
	}
	else{
		last_check(data);
		setTimeout(function(){
			$(".prompt").css("display","none");	
		},1500)
	}	
})
}




//保存输入的值
function saveStorage(id,i){
	var target = $("#"+id);
	var str = target.val();
	localStorage.setItem(i,str);
}
//加载输入的值
function loadStorage(id,i){
	var target = $("#"+id);
	var msg = localStorage.getItem(i);
	target.val(msg);
}

//清除保存的值
function clearStorage(){
	localStorage.clear();
}


function judge_name(e,count_3){
	//姓名验证
	if (e.target == document.getElementById('1')) {
	var name_test = /[\u4e00-\u9fa5]{2,}/g;
	if(!$("#1").val().match(name_test)){
		if($("#1").val() !== ""&&$("#1").next().text() == ""){
			$("#1").after('<p style="padding-left: 14px; color: red">姓名输入有误,请输入汉字</p>');
			$("#1").val("");
		}
		else if($("#1").val() !== ""&&$("#1").next().text() !== ""){
			$("#1").val("");
		}
		else if($("#1").val() == ""&&$("#1").next().text() == ""){
			$('#1').after('<p style="padding-left: 14px; color: red">此栏不能为空</p>');
		}
		else if($("#1").val() == ""&&$("#1").next().text() !== ""){
			$("#1").next().remove();
		}
	}
	else{
		$("#1").next().remove();
	}
}
}


function judge_str_number(e,count_4){
	//学号验证

	if(e.target == document.getElementById('3')){
	var stu_number = /^201+[3-6]\d{8}$/g;
	if (!$("#3").val().match(stu_number)) {
		if($("#3").val() !== ""&&$("#3").next().text() == ""){
			$("#3").after('<p style="padding-left: 14px; color: red">学号输入有误</p>');
			$("#3").val("");
		}
		else if($("#3").val() !== ""&&$("#3").next().text() !== ""){
			$("#3").val("");
		}
		else if($("#3").val() == ""&&$("#3").next().text() == ""){
			$('#3').after('<p style="padding-left: 14px; color: red">此栏不能为空</p>');
		}
		else if($("#3").val() == ""&&$("#3").next().text() !== ""){
			$("#3").next().remove();
		}
	}
	else{
		$("#3").next().remove();
	}
}
}




function judge_phone_number(e,count_5){
	//电话号码验证
	if (e.target == document.getElementById('4')) {	
	var phone_number = /^1[3|4|5|7|8]\d{9}$/g;
	if(!$("#4").val().match(phone_number)){
		if($("#4").val() !== ""&&$("#4").next().text() == ""){
			$("#4").after('<p style="padding-left: 14px; color: red">电话号码输入有误</p>');
			$("#4").val("");
		}
		else if($("#4").val() !== ""&&$("#4").next().text() !== ""){
			$("#4").val("");
		}
		else if($("#4").val() == ""&&$("#4").next().text() == ""){
			$('#4').after('<p style="padding-left: 14px; color: red">此栏不能为空</p>');
		}
		else if($("#4").val() == ""&&$("#4").next().text() !== ""){
			$("#4").next().remove();
		}
	}	
	else{
		$("#4").next().remove();
	}
}
}


// function judge_email(e){
// 	if (e.target == document.getElementById('5')) {
// 	var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// 	if(!$("#5").val().match(email)){
// 		if($("#5").val() !== ""&&$("#5").next().text() == ""){
// 			$("#5").after('<p style="padding-left: 14px; color: red">邮箱格式输入有误</p>');
// 		}
// 		else if($("#5").val() == ""&&$("#5").next().text() == ""){
// 			$('#5').after('<p style="padding-left: 14px; color: red">此栏不能为空</p>');
// 		}
// 		else if($("#5").val() == ""&&$("#5").next().text() !== ""){
// 			$("#5").next().remove();
// 		}
// 	}
// 	else{
// 		return true;
// 	}	
// }
// }

// function judge_qq(e){
// 	if (e.target == document.getElementById('6')) {
// 	var qq = /^\d{5,11}$/;
// 	if (!$("#6").val().match(qq)) {
// 		if($("#6").val() !== ""&&$("#6").next().text() == ""){
// 			$("#6").after('<p style="padding-left: 14px; color: red">请输入正确的qq号</p>');
// 		}
// 		else if($("#6").val() == ""&&$("#6").next().text() == ""){
// 			$('#6').after('<p style="padding-left: 14px; color: red">此栏不能为空</p>');
// 		}
// 		else if($("#6").val() == ""&&$("#6").next().text() !== ""){
// 			$("#6").next().remove();
// 		}
// 	}
// 	else{
// 		return true;
// 	}
// }
// }



//点击按钮，下面出现各组的介绍
function hint(){
	$("#project").click(function(){
		$("#ex").text("组别介绍 : 痴迷算法精进语言，用黑白两色的代码，敲出狂拽炫酷的APP和网页。")
	})
	$("#design").click(function(){
		$("#ex").text("组别介绍 : 致力UI和视觉设计，让产品席卷一场视觉盛宴，让界面触动人心。")
	})
	$("#product").click(function(){
		$("#ex").text("组别介绍 : 汲取灵感脑洞大开，以文案、原型图等利器，从0到1构建出产品的全貌。")
	})
	$("#operator").click(function(){
		$("#ex").text("组别介绍 : 尊用户需求为天职，谙熟将产品打造成新媒体平台“网红”的吸粉秘诀。")
	})
}



//最后一次验证，查出错误在哪
function last_check(data){
	for(var name in data){
		if(data[name] == ""||data[name] == undefined){
			switch(name){
				case "name" : $(".prompt").css("display","block"),$(".prompt_span").text("姓名")
				return;
				case "sex" : $(".prompt").css("display","block"),$(".prompt_span").text("性别")
				return;
				case "major" : $(".prompt").css("display","block"),$(".prompt_span").text("专业")
				return;
				case "student_id" : $(".prompt").css("display","block"),$(".prompt_span").text("学号")
				return;
				case "phone" : $(".prompt").css("display","block"),$(".prompt_span").text("电话")
				return;
				case "intention" :$(".prompt").css("display","block"),$(".prompt_span").text("组别")
				return;
				case "comment" : $(".prompt").css("display","block"),$(".prompt_span").text("个人信息")
				return;
			}
		}
	}
}



function get_width(){
	var top_width = $('html').width();
	$(".prompt").css("width",top_width);
}
