from django.db import models

class Font(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='fonts/')

    def __str__(self):
        return self.name

class Text3DModel(models.Model):
    text = models.CharField(max_length=255)
    font_size = models.IntegerField()
    font = models.ForeignKey(Font, on_delete=models.CASCADE)
    stl_file = models.FileField(upload_to='stlfiles/', null=True, blank=True)

    def __str__(self):
        return self.text