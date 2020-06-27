from django import forms
from .models import Comment


class CommentForm(forms.modelForm):
    class Meta:
        model = Comment
        fields = ['content']
