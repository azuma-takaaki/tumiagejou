class GroupUserController < ApplicationController
  def new
    @group = Group.find_by(id: params[:group_id])
  end

  def create
    @group_user = GroupUser.new(group_user_parameters)
    if @group_user.save
      flash[:danger] = "招待しました！"
      redirect_to Group.find_by(params[:group_id])
    else
      flash[:danger] = "招待できませんでした！"
      redirect_to Group.find_by(params[:group_id])
    end
  end

  private
    def group_user_parameters
      params.permit(:group_id, :user_id)
    end
end
